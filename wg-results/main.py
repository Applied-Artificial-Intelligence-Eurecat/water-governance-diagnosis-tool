from datetime import datetime
import os
from typing import List
import httpx
import streamlit as st
from openai import OpenAI
import json

from utils import Category, create_categories, create_paragraph

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", 'sk')
openai = OpenAI(api_key=OPENAI_API_KEY)


st.set_page_config(page_title="Water Assistant", layout="wide")

hide_streamlit_style = """
                <style>
                div[data-testid="stToolbar"] {
                visibility: hidden;
                height: 0%;
                position: fixed;
                }
                div[data-testid="stDecoration"] {
                visibility: hidden;
                height: 0%;
                position: fixed;
                }
                div[data-testid="stStatusWidget"] {
                visibility: hidden;
                height: 0%;
                position: fixed;
                }
                #MainMenu {
                visibility: hidden;
                height: 0%;
                }
                header {
                visibility: hidden;
                height: 0%;
                }
                footer {
                visibility: hidden;
                height: 0%;
                }
                div[data-testid="stMainBlockContainer"] {
                    padding-top: 2rem;
                }
                </style>
                """
st.markdown(hide_streamlit_style, unsafe_allow_html=True)


def read_and_save_json(key, lang=None):
    with open(f'{key}.json', 'r', encoding='utf-8') as ffile:
        st.session_state[key] = json.load(ffile)
    if lang is not None:
        st.session_state[key] = st.session_state[key][lang]


LANG = st.query_params.to_dict().get('lang', 'en')

read_and_save_json("relations")
read_and_save_json("questions", lang=LANG)
read_and_save_json("categories", lang=LANG)
read_and_save_json("examples", lang=LANG)
read_and_save_json("prompts", lang=LANG)
read_and_save_json("factsheets")

if "question_scores" not in st.session_state or "cat_scores" not in st.session_state:
    st.session_state['question_scores'] = {}
    st.session_state['cat_scores'] = []

QUERY_PARAMS = st.query_params.to_dict()


for key, value in st.session_state["questions"].items():
    st.session_state["question_scores"][key] = QUERY_PARAMS.get(key, 0)

for i, _ in enumerate(st.session_state["categories"]):
    st.session_state['cat_scores'].append(
        float(QUERY_PARAMS.get(f"cat{i}", 0)))


def ask_llm(messages):
    acc = ""
    try:
        messages = list(map(lambda m: {key: value for key, value in m.items() if key in [
                        "role", "content"]}, messages))
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.8,
            stream=True,
        )
        for chunk in response:
            if chunk.choices[0].delta.content is None:
                return acc
            acc += chunk.choices[0].delta.content
            yield chunk.choices[0].delta.content
    except Exception as e:
        yield from ask_llm(messages)
    return acc


def ask_fragments(messages):
    messages = list(map(lambda m: {key: value for key, value in m.items() if key in [
                    "role", "content"]}, messages))
    with httpx.stream("POST", "https://innwater.eurecatprojects.com/assistant/api/query/water_tool", json={"messages": messages}, timeout=20) as response:
        yield from response.iter_text()


SYSTEM_PROMPT = st.session_state['prompts']['system_prompt'].format('\n'.join(map(lambda x: "- " + x, st.session_state["categories"])))

CATEGORIES: List[Category] = create_categories()
if "messages" not in st.session_state:
    st.session_state["messages"] = [
        {"role": "system", "content": SYSTEM_PROMPT}]

st.write(st.session_state['prompts']['intro_text'])


def show_example(category):
    example = st.session_state["examples"][category.name]
    if example and category.score < 2:
        with st.popover(st.session_state['prompts']['show_example']):
            st.markdown("""
                        #### {title}
                        **Location**: {location}
                        """.format(**example))
            st.write(example["information"])


def run_category_diagnosis(ask_llm, category):
    col1, col2 = st.columns([3, 1])
    with col1:
        st.markdown(f"### {category.name}")
    with col2:
        if category.name in st.session_state['factsheets']:
            factsheet_url = st.session_state['factsheets'][category.name]
            st.link_button(st.session_state['prompts']['go_to_factsheet'], factsheet_url, use_container_width=True)
    iter = ask_llm(st.session_state['messages'] + [{"role": "user",
                                                    "content": category.create_category_prompt()}])
    llm_response = st.write_stream(iter)
    st.session_state['messages'] += [{"role": "assistant",
                                      "content": llm_response, "category": category}]
    show_example(category)


def run_category_group(ask_llm, group, categories):
    if len(categories) == 0:
        return
    st.markdown(group)
    for category in categories:
        run_category_diagnosis(ask_llm, category)


def show_category_diagnosis(category, response):
    col1, col2 = st.columns([3, 1])
    with col1:
        st.markdown(f"### {category.name}")
    with col2:
        if category.name in st.session_state['factsheets']:
            factsheet_url = st.session_state['factsheets'][category.name]
            st.link_button(st.session_state['prompts']['go_to_factsheet'], factsheet_url, use_container_width=True)
    st.markdown(response)


def show_category_groups(group, categories):
    if len(categories) == 0:
        return
    st.markdown(group)
    for category in categories:
        show_category_diagnosis(category['category'], category['content'])
        show_example(category['category'])


def create_summary(low_categories, middle_categories, high_categories):
    create_paragraph()
    results = "\n"
    if len(low_categories) > 0:
        results += st.session_state['prompts']['low_cats_text'].format(
            result=len(low_categories), s=("s" if len(low_categories) > 1 else ""))
    if len(middle_categories) > 0:
        results += st.session_state['prompts']['middle_cats_text'].format(
            result=len(middle_categories), s=("s" if len(middle_categories) > 1 else ""), nots=("" if len(middle_categories) > 1 else "s"))
    if len(high_categories) > 0:
        results += st.session_state['prompts']['high_cats_text'].format(
            result=len(high_categories), s=("s" if len(high_categories) > 1 else ""), nots=("" if len(high_categories) > 1 else "s"))
    st.markdown(st.session_state['prompts']['results'].format(results=results))
    st.markdown(st.session_state['prompts']['assistance_text'])


if 'answered' not in st.session_state or not st.session_state['answered']:
    low_categories = list(filter(lambda c: 0 <= c.score <= 1.7, CATEGORIES))
    middle_categories = list(filter(lambda c: 1.7 < c.score < 2.5, CATEGORIES))
    high_categories = list(filter(lambda c: 2.5 <= c.score, CATEGORIES))
    create_summary(low_categories, middle_categories, high_categories)
    run_category_group(ask_llm, st.session_state['prompts']['critical_governance_gaps'], low_categories)
    run_category_group(
        ask_llm, st.session_state['prompts']['moderate_level'], middle_categories)
    run_category_group(
        ask_llm, st.session_state['prompts']['strong_level'], high_categories)
    st.session_state['answered'] = True
    create_paragraph()
else:
    messages = list(filter(lambda m: "category" in m,
                    st.session_state['messages']))
    assistant_msgs = list(filter(lambda m: m['role'] == 'assistant', messages))
    low_categories = list(
        filter(lambda c: 0 <= c['category'].score <= 1.7, assistant_msgs))
    middle_categories = list(
        filter(lambda c: 1.7 < c['category'].score < 2.5, assistant_msgs))
    high_categories = list(
        filter(lambda c: 2.5 <= c['category'].score, assistant_msgs))
    create_summary(low_categories, middle_categories, high_categories)
    show_category_groups(st.session_state['prompts']['critical_governance_gaps'], low_categories)
    show_category_groups(st.session_state['prompts']['moderate_level'], middle_categories)
    show_category_groups(st.session_state['prompts']['strong_level'], high_categories)
    create_paragraph()


def apply(feedback):
    with open('feedback.json', 'r') as ffile:
        feedback = json.load(ffile)
    feedback.append(feedback)
    with open('feedback.json', 'w') as ffile:
        json.dump(feedback, ffile)


filtered_messages = list(filter(
    lambda m: "category" not in m and m['role'] != "system", st.session_state['messages']))
for i, message in enumerate(filtered_messages):
    if message['role'] == "system":
        continue
    if message['role'] == "user":
        with st.chat_message(message['role'], avatar=":material/person:"):
            st.markdown(message['content'])
    else:
        with st.chat_message("assistant", ):
            st.markdown(message['content'])
            selected = st.feedback(key=message['content'])
            if selected is not None:
                with open('feedback.json', 'r') as ffile:
                    feedback = json.load(ffile)
                feedback.append(
                    [datetime.now().strftime("%Y-%m-%d %H:%M:%S"), selected, filtered_messages[i - 1], message['content']])
                with open('feedback.json', 'w') as ffile:
                    json.dump(feedback, ffile)


prompt = st.chat_input(st.session_state['prompts']['input_msg'])
if prompt:
    st.session_state['messages'].append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar=":material/person:"):
        st.markdown(prompt)
    iter = ask_fragments(st.session_state['messages'])
    with st.chat_message("assistant"):
        llm_response = st.write_stream(iter)
        selected = st.feedback(key=llm_response)
        if selected is not None:
            with open('feedback.json', 'r') as ffile:
                feedback = json.load(ffile)
            feedback.append([datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"), selected, prompt, llm_response])
            with open('feedback.json', 'w') as ffile:
                json.dump(feedback, ffile)
    st.session_state['messages'].append(
        {"role": "assistant", "content": llm_response})
