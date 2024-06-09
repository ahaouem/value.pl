const sendSuggestionRequest = async () => {
  try {
    const response = await fetch("/api/suggestion?period=week");
    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error(error);
  }
};

export default sendSuggestionRequest;
