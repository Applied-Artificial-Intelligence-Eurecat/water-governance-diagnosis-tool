from typing import Dict, List, Optional
import streamlit as st
from dataclasses import dataclass, field


@dataclass
class Question:
    question: str
    score: float

    def get_question_score(self) -> str:
        return f"- {self.question} ({self.score} out of 3)"


def get_response_length(current_score):
    if 0 <= current_score <= 1:
        response_length = 5
    elif 1 < current_score <= 2.7:
        response_length = 5
    else:
        response_length = 2
    return response_length


@dataclass
class Category:
    name: str
    score: float
    questions: List[Question]
    example: Optional[str] = None

    def create_category_prompt(self):
        if self.score >= 3:
            prompt = st.session_state['prompts']['good_prompt'].format(name=self.name,
                       questions='\n'.join(
                           map(lambda question: "- " + question.question, self.questions)),
                       score=self.score)
            return prompt
        prompt = st.session_state['prompts']['bad_prompt'].format(name=self.name,
                   score=self.score,
                   questions='\n'.join(
                       map(lambda question: question.get_question_score(), self.questions)),
                   response_length=get_response_length(self.score))
        return prompt


def get_questions():
    questions = {}
    for question_id, question_prompt in st.session_state["questions"].items():
        question_score = st.session_state["question_scores"][question_id]
        questions[question_id] = (Question(question_prompt, question_score))
    return questions


def create_categories() -> List[Category]:
    questions: Dict[str, Question] = get_questions()
    categories = []
    for i, category_name in enumerate(st.session_state["categories"]):
        question_ids = []
        for question_key, related_categories in st.session_state["relations"].items():
            if i in related_categories:
                question_ids.append(question_key)
        cat_score = st.session_state['cat_scores'][i]
        cat_questions = [questions[question_id]
                         for question_id in question_ids]
        cat = Category(category_name, cat_score, cat_questions)
        categories.append(cat)
    return sorted(categories, key=lambda c: c.score)


def create_paragraph():
    st.markdown(st.session_state['prompts']['disclaimer'])
