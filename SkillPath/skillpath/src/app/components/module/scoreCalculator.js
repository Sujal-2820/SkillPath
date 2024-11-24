// components/module/ScoreCalculator.js

import React from 'react';

const ScoreCalculator = ({ selectedQuizAnswers, moduleData }) => {
  const calculateScore = () => {
    if (!moduleData || !moduleData.content) return "No data";

    let correctAnswers = 0;
    let totalQuestions = 0;

    moduleData.content.forEach((section, sectionIndex) => {
      if (section.mcq_questions) {
        section.mcq_questions.forEach((question, questionIndex) => {
          const answerKey = `${sectionIndex}-${questionIndex}`;
          if (selectedQuizAnswers[answerKey] === mapCorrectAnswer(question.correct_answer)) {
            correctAnswers++;
          }
          totalQuestions++;
        });
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return score >= 50 ? "averageOrAboveAverageScore" : "belowAverageScore";
  };

  const mapCorrectAnswer = (answer) => {
    const answerMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    return answerMap[answer];
  };

  return calculateScore();
};

export default ScoreCalculator;
