import React from 'react'
import ContentQuestions from '../components/Content/ContentQuestions'
import styles from '../styles/Questions.module.css'
const PageQuestionsAndAnswers = () => {
  return (
    <div className={styles.wrapperPageQuestions}>
      <ContentQuestions/>
    </div>
  )
}

export default PageQuestionsAndAnswers

