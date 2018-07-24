import {
  optionCards,
  selectField,
  tagsField,
  textField,
  disabledFieldText,
  endOfConversation,
} from '../StateFormatter';
import * as RTypes from '../responseTypes';

const common_greetings = /(^hello|^hllo|^hi|^hey|^hola|^sup)\b\s?.*$/i;
const common_greetings_negative = /(?!(^hello|^hi|^hey|^hllo|^sup|^hola)\b)\w+/i;
const swearwords = /(^fuck|^fck|^shit|^sh1t|^ass|^a$$)\b\s?.*$/i;




const questions = {
  start: {
    botPrompt: 'Hey there! My name is <strong>Pascal</strong>, I am an awesome <strong>chatbot</strong> here to help you find affordable housing!',
    answers: [
      {
        nextId: 'yourName',
      },
    ],
  },
  yourName: {
    botPrompt: 'Before we start do mind telling me your name?',
    input: textField(),
    answers: [
      {
        answer: swearwords,
        nextId: 'greetings_swearword',
      },
      {
        answer: common_greetings,
        nextId: 'greetings_notAName',
      },
      {
        answer: common_greetings_negative,
        catchName: true,
        nextId: 'asYouCanSee',
      },
    ],
  },
  greetings_swearword: {
    botPrompt: 'Do you kiss your mom with that mouth?',
    answers: [
      {
        nextId: 'greetings_whatsYourNameAgain',
      },
    ],
  },
  greetings_notAName: {
	  botPrompt: 'haha very funny but is that really your name?',
	  answers: [
	    {
	      nextId: 'greetings_whatsYourNameAgain',
	    },
	  ],
  },
  greetings_whatsYourNameAgain: {
	  botPrompt: 'So what’s <strong>your name</strong>?',
	  input: textField(),
	  answers: [
      {
        answer: swearwords,
        nextId: 'greetings_swearword',
      },
      {
        answer: common_greetings,
        nextId: 'greetings_notAName',
      },
      {
        answer: common_greetings_negative,
        catchName: true,
        nextId: 'asYouCanSee',
      },
	  ],
  },
  asYouCanSee: {
    botPrompt: 'Hi <strong>@varName</strong>,I am going to ask you a few questions to help you align with an appropriate budget  🎉.',
    type: RTypes.TRANSFORMED_TEXT,
    varName: 'userName',
    answers: [
			{ nextId: 'select' },
    ],
  },
  select: {
    botPrompt: 'Ready to find the perfect house?',
    varName: 'userName',
    input: selectField(['Hell Yeah!']),
    answers: [
			{ nextId: 'question1' },
    ],
  },
  question1: {
    botPrompt: 'First things first, where do you want to move to?',
    type: RTypes.TRANSFORMED_TEXT,
    varName: 'userName',
    input: selectField(['Mississauga', 'Waterloo', "Toronto"]),
    answers: [
      {
        answer: 'Mississauga',
        nextId: 'cool',
        sumToBags: [{ name: 'Cheap', points: 3 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 1 }],
      },
      {
        answer: 'Waterloo',
        nextId: 'hmkay',
        sumToBags: [{ name: 'Cheap', points: 2 }, { name: 'Medium', points: 3 }, { name: 'Expensive', points: 2 }],
      },
      {
        answer: "Toronto",
        nextId: 'hmm',
        sumToBags: [{ name: 'Cheap', points: 1 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 3 }],
      },
    ],
  },
  cool: {
    botPrompt: 'Mississauga is Great!',
    answers: [
      {
        nextId: 'question2',
      },
    ],
  },
  hmm: {
    botPrompt: 'Toronto is Great!',
    answers: [
      {
        nextId: 'question2',
      },
    ],
  },
  hmkay: {
    botPrompt: 'Water Water Water (loo loo loo)!',
    answers: [
      {
        nextId: 'question2',
      },
    ],
  },
  question2: {
    botPrompt: 'How long do you want to rent for?',
    input: selectField(['4 months', '8 months', "1 year"]),
    answers: [
      {
        answer: '4 months',
        // shouldEstimateRecommendation: true,
        nextId: 'q34',
        sumToBags: [{ name: 'Cheap', points: 3 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 1 }],
      },
      {
        answer: '8 months',
        // shouldEstimateRecommendation: true,
        nextId: 'q38',
        sumToBags: [{ name: 'Cheap', points: 2 }, { name: 'Medium', points: 3 }, { name: 'Expensive', points: 2 }],
      },
      {
        answer: "1 year",
        // shouldEstimateRecommendation: true,
        nextId: 'q31',
        sumToBags: [{ name: 'Cheap', points: 1 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 3 }],
      },
    ],
  },
  q34: {
    botPrompt: 'Short and sweet huh?',
    answers: [
      {
        nextId: 'q3',
      },
    ],
  },
  q38: {
      botPrompt: 'I see a standard school year',
      answers: [
        {
          nextId: 'q3',
        },
      ],
    },
  q31: {
      botPrompt: 'A commitment!',
      answers: [
        {
          nextId: 'q3',
        },
      ],
    },
    q3: {
        botPrompt: 'Now, to help me understand your lifestyle goals, how much time do you intend to spend at home weekly?',
        input: selectField(['All day', 'Occasionally studying', "I'm never home"]),
        answers: [
          {
            answer: "I'm never home",
            // shouldEstimateRecommendation: true,
            nextId: 'q4',
            sumToBags: [{ name: 'Cheap', points: 3 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 1 }],
          },
          {
            answer: 'Occasionally studying',
            // shouldEstimateRecommendation: true,
            nextId: 'q4',
            sumToBags: [{ name: 'Cheap', points: 2 }, { name: 'Medium', points: 3 }, { name: 'Expensive', points: 2 }],
          },
          {
            answer: "All day",
            // shouldEstimateRecommendation: true,
            nextId: 'q4',
            sumToBags: [{ name: 'Cheap', points: 1 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 3 }],
          },
        ],
      },

      q4: {
        botPrompt: 'Fun Fact, the length of your shower affects your utility bill, What is your regular hygiene routine?',
        input: selectField(['use ALL the water!', 'Occasional baths', "I'm out in 5... seconds"]),
        answers: [
          {
            answer: "I'm out in 5... seconds",
            // shouldEstimateRecommendation: true,
            nextId: 'q5',
            sumToBags: [{ name: 'Cheap', points: 3 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 1 }],
          },
          {
            answer: 'Occasional baths',
            // shouldEstimateRecommendation: true,
            nextId: 'q5',
            sumToBags: [{ name: 'Cheap', points: 2 }, { name: 'Medium', points: 3 }, { name: 'Expensive', points: 2 }],
          },
          {
            answer: "use ALL the water!",
            // shouldEstimateRecommendation: true,
            nextId: 'q5',
            sumToBags: [{ name: 'Cheap', points: 1 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 3 }],
          },
        ],
      },
      q5: {
        botPrompt: 'An often overlooked cost, internet can get pretty expensive! How much do you think you use in a month?',
        input: selectField(['Bro I host Lan parties on the daily', 'I stream some netflix on occasion', "I just use the web to study"]),
        answers: [
          {
            answer: "I just use the web to study",
            // shouldEstimateRecommendation: true,
            nextId: 'q6',
            sumToBags: [{ name: 'Cheap', points: 3 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 1 }],
          },
          {
            answer: 'I stream some netflix on occasion',
            // shouldEstimateRecommendation: true,
            nextId: 'q6',
            sumToBags: [{ name: 'Cheap', points: 2 }, { name: 'Medium', points: 3 }, { name: 'Expensive', points: 2 }],
          },
          {
            answer: "Bro I host Lan parties on the daily",
            // shouldEstimateRecommendation: true,
            nextId: 'q6',
            sumToBags: [{ name: 'Cheap', points: 1 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 3 }],
          },
        ],
      },
      q6: {
        botPrompt: 'Last but not least what are your eating habits? Do you go out often? or Cook every meal?',
        input: selectField(['Cook every meal', 'Go out a few times a week', "Uber eats every night"]),
        answers: [
          {
            answer: "Cook every meal",
            shouldEstimateRecommendation: true,
            nextId: null,
            sumToBags: [{ name: 'Cheap', points: 3 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 1 }],
          },
          {
            answer: 'Got out a few times a week',
            shouldEstimateRecommendation: true,
            nextId: null,
            sumToBags: [{ name: 'Cheap', points: 2 }, { name: 'Medium', points: 3 }, { name: 'Expensive', points: 2 }],
          },
          {
            answer: "Uber eats every night",
            shouldEstimateRecommendation: true,
            nextId: null,
            sumToBags: [{ name: 'Cheap', points: 1 }, { name: 'Medium', points: 2 }, { name: 'Expensive', points: 3 }],
          },
        ],
      },

  Cheap: {
    botPrompt: 'Hey, I like you <strong>@varName</strong>!',
    type: RTypes.TRANSFORMED_TEXT,
    varName: 'userName',
    answers: [
      {
        nextId: 'gottaGive',
      },
    ],
  },
  gottaGive: {
    botPrompt: 'Just like me you are a cheap as--- I mean frugal spender!',
    answers: [
      {
        nextId: 'cheap2',
      },
    ],
  },
  cheap2: {
    botPrompt: "From my calculations you should look for a house ranging from the low 400's to 800, you'll also spend about 19 dollars on Hydro, 300 on food, 32 on internet and 30 on water a month",
    answers: [
      {
        nextId: 'cheap3',
      },
    ],
  },
  cheap3: {
    botPrompt: 'You would spend a grand total of 963 dollars a month!',
    finishConversation: true,
    answers: [
      {
        nextId: 'check_out1',
      },
    ],
  },
  Medium: {
    botPrompt: "consulting my magic ball... well <strong>@varName</strong>? it seems like you're a medium spender",
    type: RTypes.TRANSFORMED_TEXT,
    varName: 'userName',
    answers: [
      {
        nextId: 'medium2',
      },
    ],
  },
  medium2: {
    botPrompt: 'https://media.giphy.com/media/ym07KfAUZI5Nu/giphy.gif',
    type: RTypes.MEDIA,
    answers: [
      {
        nextId: 'medium3',
      },
    ],
  },
  medium3: {
    botPrompt: "Looks like in total you would spend 49 dollars for hydro, 39 on Water, 52 on internet, 500!! on food and 860 a month for rent, a grand total of 1500 per month!",
    answers: [
      {
        nextId: 'check_out1',
        finishConversation: true,
      },
    ],
  },
  Expensive: {
    botPrompt: "Wowzers you're a high roller!",
    answers: [
      {
        nextId: 'expensive2',
      },
    ],
  },
  expensive2: {
    botPrompt: "By our calculations you would spend 79 on Hydro, 70 on Water, 72 on Internet, 1000 on food and 1400 on rent, for a grand total of 2621 dollars a month!",
    answers: [
      {
        nextId: 'expensive3',
      },
    ],
  },
  expensive3: {
    botPrompt: 'https://media.giphy.com/media/VTxmwaCEwSlZm/giphy.gif',
    type: RTypes.MEDIA,
    finishConversation: true,
    answers: [
      {
        nextId: 'check_out1',
      },
    ],
  },
  check_out1: {
    botPrompt: 'Cool huh?',
    input: selectField(['Not bad...']),
    answers: [
      { nextId: 'check_out2' },
    ],
  },
  check_out2: {
    botPrompt: "Made a mistake? Don't worry fam I can estimate all night!",
    input: endOfConversation(),
    answers: [
      {
        nextId: 'check_out1',
      },
    ],
  },
};


export default questions;
