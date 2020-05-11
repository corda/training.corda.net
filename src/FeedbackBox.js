import React from 'react';
import styled from '@emotion/styled';
//import {breakpoints} from 'gatsby-theme-apollo-core';
import IconSmile from "./assets/fa-smile-light.svg"
import IconMeh from "./assets/fa-meh-light.svg"
import IconFrown from "./assets/fa-frown-light.svg"

const formActionEndpoint = "https://formspree.io/xzbjbwla";

 /* FeedbackBox Component
  * Collects page feedback (rate this page) in a form and sends the data to an endpoint.
  * We currently use formspree.io as receiver.
  */
export default class FeedbackBox extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      showFeedbackContainer: true,
      isSubmitted: false,
      rating: "",
      message: "",
      page: ""
    }

    this.feedbackForm = React.createRef();
    this.responsePage = React.createRef();
    this.feedbackContent = React.createRef();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevState.showForm && this.state.showForm) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  
  render() {

    const FeedbackBoxWrapper = styled.div`
      text-align: center;
      margin-bottom: 60px;
    `;


    const FeedbackBoxContainer = styled.div`
      display: none;
      width: 180px;
      margin: auto;

      &.visible {
        display: flex;
      }

      button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }
    `;

    const SmileyBox = styled.div`
      margin: 15px;
    `

    const SmileyIcon = styled.img`
      width: 30px;

    `;

    const FeedbackForm = styled.div`
      display: none;

      &.visible {
        display: block;
      }
    `

    const FormControl = styled.div`
      width: 50%;
      margin: auto;

      textarea {
        width: 100%;
        height: 100px;
      }
    `

    const ControlLabel = styled.div`

    `

    const FormSubmit = styled.div`
      width: 100px;
      padding: 4px;
      margin: auto;
      background-color: transparent;
      border-radius: 4px;
      border-width: 0;
      color: #424855;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;

      &:hover {
        background-color: #F4F6F8;
        color: #424855;
      }
    `

    const ResponsePage = styled.div`
      font-size: 1.2em;
      display: none;

      &.visible {
        display: block;
      }
    `

    const showFeedbackForm = (rating) =>  {
      this.setState({
        showForm : true,
        rating: rating,
        page: window.location.href
      } );
    }


    const submitFeedbackForm = () => {
      console.log("submit feedback form");

      const form = this.feedbackForm.current;

      var formData = new FormData(form);
      console.log("data:");
      console.log([...formData.entries()]);

      const fetchOptions = {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      }

      fetch(formActionEndpoint, fetchOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //responsePage.current.
        this.setState({ isSubmitted:true, showForm: false, showFeedbackContainer: false });
      });

    }


    return (
      <FeedbackBoxWrapper>
        Rate this Page
        <FeedbackBoxContainer className={this.state.showFeedbackContainer ? 'visible' : ''}>
          <button onClick={() => showFeedbackForm("bad")}>
            <SmileyBox>
              <SmileyIcon src={IconFrown} alt="icon frown" />
            </SmileyBox>
          </button>
          <button onClick={() => showFeedbackForm("medium")}>
            <SmileyBox>
              <SmileyIcon src={IconMeh} alt="icon meh" />
            </SmileyBox>
          </button>
          <button onClick={() => showFeedbackForm("good")}>
            <SmileyBox>
              <SmileyIcon src={IconSmile} alt="icon smile" />
            </SmileyBox>
          </button>
        </FeedbackBoxContainer>
        
        <FeedbackForm id="feedback_form" className={this.state.showForm ? 'visible' : ''}>
          <form id="page_rating_form" method="POST" action={formActionEndpoint} ref={this.feedbackForm}>
            <FormControl>
              <ControlLabel>Would you like to add a message?</ControlLabel>
              <textarea name="f_message"></textarea>
            </FormControl>
            <FormControl>
              <FormSubmit onClick={submitFeedbackForm}>Submit</FormSubmit>
            </FormControl>
            <input type="hidden" name="f_page" value={this.state.page}/>
            <input type="hidden" name="f_rating" value={this.state.rating}/>
          </form>
        </FeedbackForm>
        <ResponsePage ref={this.responsePage} className={this.state.isSubmitted ? 'visible' : ''}>
          Thank you for your Feedback!
        </ResponsePage>
      </FeedbackBoxWrapper>
    );
  }

}
