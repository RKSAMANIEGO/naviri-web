import React from 'react'
import HeaderFrequentlyAskedQuestions from '../components/Header/HeaderFrequentlyAskedQuestions'
import ContentQuestions from '../components/Content/ContentQuestions'
import styles from '../styles/Questions.module.css'
const PageQuestionsAndAnswers = () => {
  return (
    <div className={styles.wrapperPageQuestions}>
      <HeaderFrequentlyAskedQuestions/>
      <ContentQuestions/>
    </div>
  )
}

export default PageQuestionsAndAnswers

