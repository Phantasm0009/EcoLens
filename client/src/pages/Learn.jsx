import React, { useState } from 'react';
import { FaBookOpen, FaRecycle, FaQuestionCircle, FaCheck, FaTimes } from 'react-icons/fa';

const Learn = () => {
    const [activeTab, setActiveTab] = useState('basics');
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    
    const materialInfo = [
        {
            id: 'plastic',
            title: 'Plastics',
            content: 'Plastics can take up to 1,000 years to decompose in landfills. Recycling one ton of plastic saves about 7.4 cubic yards of landfill space.',
            recyclable: 'Types 1 (PET) and 2 (HDPE) are widely recyclable. Types 3-7 vary by location.',
            preparation: 'Rinse containers, remove lids and labels when possible. Flatten to save space.',
            impact: 'Recycling plastic reduces oil consumption and prevents plastic pollution in oceans.'
        },
        {
            id: 'paper',
            title: 'Paper',
            content: 'Paper can be recycled 5-7 times before fibers become too short. Recycling one ton of paper saves 17 trees.',
            recyclable: 'Most clean paper products including office paper, newspapers, magazines, and cardboard.',
            preparation: 'Keep dry and clean. Remove plastic wrapping, tape, and staples.',
            impact: 'Paper recycling reduces greenhouse gas emissions, saves trees, and conserves water.'
        },
        {
            id: 'glass',
            title: 'Glass',
            content: 'Glass can be recycled endlessly without loss in quality or purity. Using recycled glass consumes 40% less energy than making new glass.',
            recyclable: 'Most food and beverage glass containers.',
            preparation: 'Rinse containers and remove lids. Sort by color if required in your area.',
            impact: 'Glass recycling reduces mining waste, energy usage, and CO2 emissions.'
        },
        {
            id: 'metal',
            title: 'Metal',
            content: 'Aluminum cans can be recycled and back on store shelves in just 60 days. Recycling saves 95% of the energy needed to make aluminum from raw materials.',
            recyclable: 'Aluminum cans, steel food cans, clean aluminum foil, and empty aerosol cans.',
            preparation: 'Rinse food containers. Crush cans to save space (optional).',
            impact: 'Metal recycling significantly reduces mining impacts and energy consumption.'
        }
    ];
    
    const recyclingQuiz = [
        {
            question: 'Which of these items should NOT be placed in recycling bins?',
            options: [
                'Plastic water bottles',
                'Aluminum cans',
                'Styrofoam containers',
                'Cardboard boxes'
            ],
            correctAnswer: 2,
            explanation: 'Styrofoam (expanded polystyrene) is rarely accepted in curbside recycling programs because it\'s difficult to recycle and has low market value.'
        },
        {
            question: 'Should you rinse containers before recycling them?',
            options: [
                'Yes, all containers should be rinsed',
                'No, it wastes water',
                'Only if they contained hazardous materials',
                'Only metal containers need rinsing'
            ],
            correctAnswer: 0,
            explanation: 'Food residue can contaminate entire batches of recyclables, making them unusable. A quick rinse helps ensure materials can actually be recycled.'
        },
        {
            question: 'What happens when non-recyclable items are placed in recycling bins?',
            options: [
                'They get sorted out and thrown away',
                'They can contaminate and ruin entire batches of recyclables',
                'They get returned to your home',
                'They get composted instead'
            ],
            correctAnswer: 1,
            explanation: 'Non-recyclables can contaminate entire batches of recyclable materials, causing them to be sent to landfills instead of being recycled.'
        }
    ];
    
    const handleOptionSelect = (questionIndex, optionIndex) => {
        if (quizSubmitted) return;
        
        setQuizAnswers({
            ...quizAnswers,
            [questionIndex]: optionIndex
        });
    };
    
    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
    };
    
    const resetQuiz = () => {
        setQuizAnswers({});
        setQuizSubmitted(false);
    };
    
    const getOptionClass = (questionIndex, optionIndex) => {
        if (!quizSubmitted) {
            return quizAnswers[questionIndex] === optionIndex ? 'selected' : '';
        }
        
        const correctAnswer = recyclingQuiz[questionIndex].correctAnswer;
        
        if (optionIndex === correctAnswer) {
            return 'correct';
        } else if (quizAnswers[questionIndex] === optionIndex) {
            return 'incorrect';
        }
        return '';
    };
    
    const calculateScore = () => {
        if (!quizSubmitted) return 0;
        
        let correctCount = 0;
        recyclingQuiz.forEach((question, index) => {
            if (quizAnswers[index] === question.correctAnswer) {
                correctCount++;
            }
        });
        
        return correctCount;
    };

    return (
        <div className="page-container learn-page">
            <div className="page-header">
                <h1><FaBookOpen className="header-icon" /> Learn About Recycling</h1>
                <p className="subtitle">Discover how to recycle properly and make a positive environmental impact</p>
            </div>
            
            <div className="content-container learn-content">
                <div className="tabs-container">
                    <div className="tabs">
                        <button 
                            className={`tab-button ${activeTab === 'basics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('basics')}
                        >
                            <FaRecycle className="me-2" /> Recycling Basics
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'materials' ? 'active' : ''}`}
                            onClick={() => setActiveTab('materials')}
                        >
                            <FaRecycle className="me-2" /> Materials Guide
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
                            onClick={() => setActiveTab('quiz')}
                        >
                            <FaQuestionCircle className="me-2" /> Knowledge Quiz
                        </button>
                    </div>
                    
                    <div className="tab-content">
                        {activeTab === 'basics' && (
                            <div>
                                <h2>Recycling Fundamentals</h2>
                                
                                <div className="basics-card">
                                    <h3>Why Recycle?</h3>
                                    <p>Recycling conserves natural resources, reduces pollution, saves energy, and decreases the amount of waste sent to landfills. By recycling, you help create a sustainable future for generations to come.</p>
                                    
                                    <div className="info-grid">
                                        <div className="info-card">
                                            <h4>Reduces Waste</h4>
                                            <p>Each American produces about 4.5 pounds of trash daily. Recycling diverts a significant portion from landfills.</p>
                                        </div>
                                        <div className="info-card">
                                            <h4>Saves Energy</h4>
                                            <p>Making products from recycled materials uses significantly less energy than creating them from raw materials.</p>
                                        </div>
                                        <div className="info-card">
                                            <h4>Creates Jobs</h4>
                                            <p>The recycling industry creates more jobs than landfill or incineration operations.</p>
                                        </div>
                                        <div className="info-card">
                                            <h4>Reduces Pollution</h4>
                                            <p>Recycling reduces the need for extracting and processing raw materials, which generates pollution.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="basics-card">
                                    <h3>The 3 Rs: Reduce, Reuse, Recycle</h3>
                                    <p>Follow this hierarchy to minimize your environmental footprint:</p>
                                    
                                    <div className="three-rs">
                                        <div className="step">
                                            <h4>1. Reduce</h4>
                                            <p>The most effective way to reduce waste is to not create it in the first place. Purchase only what you need and choose products with minimal packaging.</p>
                                        </div>
                                        <div className="step">
                                            <h4>2. Reuse</h4>
                                            <p>Find new ways to use items instead of throwing them away. Repair broken items, donate unwanted goods, or repurpose them for different uses.</p>
                                        </div>
                                        <div className="step">
                                            <h4>3. Recycle</h4>
                                            <p>When you cannot reduce or reuse, recycle properly. Learn your local recycling guidelines and follow them carefully.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'materials' && (
                            <div>
                                <h2>Materials Recycling Guide</h2>
                                <p className="guide-intro">Learn how to properly prepare and recycle different materials:</p>
                                
                                {materialInfo.map((material) => (
                                    <div key={material.id} className="material-card">
                                        <div className="material-header">
                                            <h3>{material.title}</h3>
                                        </div>
                                        <div className="material-content">
                                            <div className="material-section">
                                                <h4>About</h4>
                                                <p>{material.content}</p>
                                            </div>
                                            <div className="material-section">
                                                <h4>What's Recyclable</h4>
                                                <p>{material.recyclable}</p>
                                            </div>
                                            <div className="material-section">
                                                <h4>Preparation</h4>
                                                <p>{material.preparation}</p>
                                            </div>
                                            <div className="material-section">
                                                <h4>Environmental Impact</h4>
                                                <p>{material.impact}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {activeTab === 'quiz' && (
                            <div>
                                <h2>Test Your Recycling Knowledge</h2>
                                <p className="quiz-intro">Answer these questions to test what you've learned about recycling:</p>
                                
                                <div className="quiz-container">
                                    {recyclingQuiz.map((quiz, questionIndex) => (
                                        <div key={questionIndex} className="quiz-question-container">
                                            <p className="quiz-question">{questionIndex + 1}. {quiz.question}</p>
                                            
                                            <div className="quiz-options">
                                                {quiz.options.map((option, optionIndex) => (
                                                    <div 
                                                        key={optionIndex}
                                                        className={`quiz-option ${getOptionClass(questionIndex, optionIndex)}`}
                                                        onClick={() => handleOptionSelect(questionIndex, optionIndex)}
                                                    >
                                                        {option}
                                                        {quizSubmitted && optionIndex === quiz.correctAnswer && (
                                                            <FaCheck className="option-icon correct-icon" />
                                                        )}
                                                        {quizSubmitted && optionIndex !== quiz.correctAnswer && 
                                                         quizAnswers[questionIndex] === optionIndex && (
                                                            <FaTimes className="option-icon incorrect-icon" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {quizSubmitted && (
                                                <div className="quiz-explanation">
                                                    <strong>Explanation:</strong> {quiz.explanation}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {!quizSubmitted ? (
                                        <button 
                                            className="btn btn-primary quiz-submit-btn"
                                            onClick={handleQuizSubmit}
                                            disabled={Object.keys(quizAnswers).length < recyclingQuiz.length}
                                        >
                                            Submit Answers
                                        </button>
                                    ) : (
                                        <div className="quiz-results">
                                            <h3>Your Score: {calculateScore()} out of {recyclingQuiz.length}</h3>
                                            <button className="btn btn-secondary" onClick={resetQuiz}>
                                                Retake Quiz
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Learn;