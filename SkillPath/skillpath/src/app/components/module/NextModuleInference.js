// components/module/NextModuleInference.js

const NextModuleInference = ({ score, Review, difficulty }) => {
    const getNextAction = () => {
      const rules = {
        "standard": {
          "average_or_above_average_score": {
            "happy": {
              "next_action": "next_module"
            },
            "neutral": {
              "next_action": "easy"
            },
            "sad": {
              "next_action": "easy"
            }
          },
          "below_average_score": {
            "happy": {
              "next_action": "easy"
            },
            "neutral": {
              "next_action": "easiest"
            },
            "sad": {
              "next_action": "easy"
            }
          }
        },
        "easy": {
          "average_or_above_average_score": {
            "happy": {
              "next_action": "next_module"
            },
            "neutral": {
              "next_action": "easiest"
            },
            "sad": {
              "next_action": "easy"
            }
          },
          "below_average_score": {
            "happy": {
              "next_action": "easiest"
            },
            "neutral": {
              "next_action": "easiest"
            },
            "sad": {
              "next_action": "easy"
            }
          }
        },
        "easiest": {
          "average_or_above_average_score": {
            "next_action": "next_module"
          },
          "below_average_score": {
            "next_action": "easiest"
          }
        }
      };
  
      console.log("Inputs - Score:", score, "Review:", Review, "Difficulty:", difficulty);
  
      const scoreKey = score === "averageOrAboveAverageScore" ? "average_or_above_average_score" : "below_average_score";
      const reviewKey = Review;
  
      console.log("Derived Keys - Score Key:", scoreKey, "Review Key:", reviewKey);
  
      if (rules[difficulty] && rules[difficulty][scoreKey] && rules[difficulty][scoreKey][reviewKey]) {
        console.log("Matched Action:", rules[difficulty][scoreKey][reviewKey].next_action);
        return rules[difficulty][scoreKey][reviewKey].next_action;
      } else if (rules[difficulty] && rules[difficulty][scoreKey]) {
        console.log("Matched Action:", rules[difficulty][scoreKey].next_action);
        return rules[difficulty][scoreKey].next_action;
      }
  
      console.log("Action: unknown");
      return "unknown";
    };
  
    return getNextAction();
  };
  
  export default NextModuleInference;
  