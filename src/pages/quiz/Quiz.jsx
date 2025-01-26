import React from 'react';
import './quiz.css';
import { useState, useEffect } from 'react';
//Soruların verilerini çektiğimiz dosya
import questions from '../../questions/questions'; 
import { useNavigate } from 'react-router-dom';


//Soru fonksiyonu ve gösterilecek içerik ekranı
function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [quizOver, setQuizOver] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        if (timeLeft > 0 && !quizOver) {
            const countdown = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timeLeft === 0) {
            goToNextQuestion(selectedAnswers);
        }
    }, [timeLeft, quizOver]);

    useEffect(() => {
        const optionsTimeout = setTimeout(() => {
            setShowOptions(true);
        }, 4000);
        return () => clearTimeout(optionsTimeout);
    }, [currentQuestionIndex]);

    const handleAnswerClick = (option) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = {
            questionId: currentQuestion.id,
            answer: option,
            isCorrect: option === currentQuestion.answer,
        };
        setSelectedAnswers(updatedAnswers);
        
        goToNextQuestion(updatedAnswers);
    };

    const goToNextQuestion = (updatedAnswers) => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(30);
            setShowOptions(false);
        } else {
            // Son soru için, cevap verilmedi durumu
            const finalAnswers = [...updatedAnswers];
            if (finalAnswers[currentQuestionIndex] === undefined) {
                finalAnswers[currentQuestionIndex] = {
                    questionId: currentQuestion.id,
                    answer: 'Cevap verilmedi',
                    isCorrect: false,
                };
            }
            setSelectedAnswers(finalAnswers);
            setQuizOver(true);
        }
    };

    const calculateStatistics = () => {
        const totalQuestions = questions.length;
        const answeredCorrectly = selectedAnswers.filter(answer => answer?.isCorrect).length;
        const answeredIncorrectly = selectedAnswers.filter(answer => answer?.isCorrect === false && answer.answer !== 'Cevap verilmedi').length;

        // Boş bırakılan soruları sayıyoruz.
        const unanswered = selectedAnswers.filter(answer => answer === undefined || answer.answer === 'Cevap verilmedi').length;

        return { totalQuestions, answeredCorrectly, answeredIncorrectly, unanswered };
    };

    const { totalQuestions, answeredCorrectly, answeredIncorrectly, unanswered } = calculateStatistics();
    
    const navigate = useNavigate();
    const restart = () => {
      navigate('/');//App.jsx'te verdiğimiz routerdaki yolu import edip kullanıyoruz
    }

    return (
        <div className='quiz'>
            {!quizOver ? (
                <div className='quiz-container'>
                    <h2 className='timer'><span>Kalan Süre: </span>{timeLeft}</h2>
                    <img src={currentQuestion.media} alt="question media" />
                    <h3><span>Soru {currentQuestion.id}.</span> {currentQuestion.question}</h3>
                    {showOptions && (
                        <div className='options-container'>
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={selectedAnswers[currentQuestionIndex] !== undefined}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className='quiz-result quizs quiz-containers'>
                  <div>
                    <h1>Tebrikler!</h1>
                    <p>Cevapların:</p>
                    <h4>Toplam Sorular: {totalQuestions}</h4>
                    <h4>Doğru Cevaplar: {answeredCorrectly}</h4>
                    <h4>Yanlış Cevaplar: {answeredIncorrectly}</h4>
                    <h4>Boş Bırakılan: {unanswered}</h4>
                    <button onClick={restart} className='restart-button'>Yeniden Başla</button>
                    </div>
                    <div>
                    <ul className='selected-answers'>
                        {questions.map((question, index) => {
                            const currentAnswer = selectedAnswers[index] || {};
                            const correctAnswer = question.answer;
                            const userAnswer = currentAnswer.answer || 'Cevap verilmedi';
                            return (
                                <li key={index}>
                                    <strong>Soru {index + 1}:</strong> <br /> {currentAnswer.answer === '' ? 'Cevap verilmedi' : (currentAnswer.isCorrect ? `Senin cevabın : ${userAnswer}, Doğru cevap : ${correctAnswer}` : `Senin cevabın : ${userAnswer}, Doğru cevap : ${correctAnswer}`)}
                                </li>
                            );
                        })}
                    </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Quiz;