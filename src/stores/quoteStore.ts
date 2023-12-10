import { writable, type Writable } from 'svelte/store';

interface Quote {
	quoteText: string;
	id: number;
}

// listen to changes on main quote in top box
export const bookmark: Writable<boolean> = writable(false);

export const categories: Writable<Set<string>> = writable(new Set());

export const quote: Writable<string> = writable('');

export const quotes: Writable<Quote[]> = writable([]);

export const addQuote = (quoteText: string) => {
	bookmark.set(true);
	quotes.update((quotes) => {
		// check existence & empty strings
		if (
			quotes.filter((quoteObj) => quoteText === quoteObj.quoteText).length > 0 ||
			quoteText.trim() == ''
		) {
			return quotes;
		}

		const newQuotes = [...quotes, { quoteText, id: Date.now() }];
		localStorage.setItem('quotes', JSON.stringify(newQuotes));
		return newQuotes;
	});
};

export const deleteQuote = (quoteText: string) => {
	bookmark.set(false);
	quotes.update((quotes) => {
		const newQuotes = quotes.filter((quoteObj) => quoteObj.quoteText !== quoteText);
		localStorage.setItem('quotes', JSON.stringify(newQuotes));
		return newQuotes;
	});
};

export const resetQuotes = () => {
	quotes.set([]);
	localStorage.removeItem('quotes');
};

export const generateRandomQuote = async () => {
	// generate random quote
	const data = await fetch('https://api.quotable.io/random?maxLength=150')
		.then((response) => response.json())
		.catch((error) => {
			console.log(`Error: ${error}`);
		});

	// reset bookmark for new quote
	bookmark.set(false);

	quote.set(data.content);
};
