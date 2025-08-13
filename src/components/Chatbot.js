
const Chatbot = {
    defaultResponses: {
        "Ciao": "Hello! How can I help you?",
        "Hi": "Hello! How can I help you?",
        "Hola": "Hello! How can I help you?",
        "Hello": "Hello! How can I help you?",
        "How are you?": "I'm just a bot, but thanks for asking! How about you?",
        "What time is it?": "I can’t check the clock directly, but your device should have the current time.",
        "Yes": "Okay.",
        "No": "Alright.",
        "Where are you?": "I’m here.",
        "What is your name?": "I'm Gabriele Varchetta's interactive CV.",
        "What can you do?": "I can answer your questions about me!",
        "Tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
        "Thank you": "You're welcome! If you need anything else, just ask.",
        "Goodbye": "Goodbye! Have a great day!",
        "Who are you?": "I'm Gabriele Varchetta, a Junior IT Specialist with a focus on full-stack development. I graduated with top marks in Computer Science and Telecommunications and have experience with international projects, internships, and technical training.",
        "What skills do you have?": "Technical skills: HTML, CSS, JavaScript, React, Java, C++, Python, MySQL, Flutter, Astro, Strapi, Git. Soft skills: leadership, teamwork, problem solving, adaptability, communication.",
        "Work experience": "Junior Developer Intern at Fenles Startup, Barcelona (Nov-Dec 2024): built interfaces with HTML, CSS, Astro, Flutter, managed content via Strapi CMS, coordinated a team of students.",
        "Projects": "Erasmus+ Cyprus: language and intercultural training. PCTO Accenture: Full Stack training (Java, MySQL, HTML, CSS). Form&Job course: robotics assistant using Python.",
        "Certifications": "Cybersecurity Essentials – Cisco Networking Academy, 2025.",
        "Languages": "Italian: native | English: advanced (B2) | Spanish: intermediate (A2-B1).",
        "How can I contact you?": "You can email me at gabriele.varchetta05@gmail.com, call +39 334 312 4928, or find me on LinkedIn: linkedin.com/in/gabriele-varchetta-t777t",
    },

    additionalResponses: {},

    unsuccessfulResponse: `Sorry, I didn't quite understand that. Currently, You can check some example questions!`,

    emptyMessageResponse: `Sorry, it looks like your message is empty. Please make sure you send a message and I will give you a response.`,

    addResponses: function (additionalResponses) {
        this.additionalResponses = {
            ...this.additionalResponses,
            ...additionalResponses
        };
    },

    getResponse: function (message) {
        if (!message) {
            return this.emptyMessageResponse;
        }

        const responses = {
            ...this.defaultResponses,
            ...this.additionalResponses,
        };

        const {
            ratings,
            bestMatchIndex,
        } = this.stringSimilarity(message, Object.keys(responses));

        const bestResponseRating = ratings[bestMatchIndex].rating;
        if (bestResponseRating <= 0.3) {
            return this.unsuccessfulResponse;
        }

        const bestResponseKey = ratings[bestMatchIndex].target;
        const response = responses[bestResponseKey];

        if (typeof response === 'function') {
            return response();
        } else {
            return response;
        }
    },

    getResponseAsync: function (message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getResponse(message));
            }, 1000);
        });
    },

    compareTwoStrings: function (first, second) {
        first = first.toLowerCase().replace(/\s+/g, '');
        second = second.toLowerCase().replace(/\s+/g, '');

        if (first === second) return 1;
        if (first.length < 2 || second.length < 2) return 0;

        let firstBigrams = new Map();
        for (let i = 0; i < first.length - 1; i++) {
            const bigram = first.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram) + 1
                : 1;

            firstBigrams.set(bigram, count);
        }

        let intersectionSize = 0;
        for (let i = 0; i < second.length - 1; i++) {
            const bigram = second.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram)
                : 0;

            if (count > 0) {
                firstBigrams.set(bigram, count - 1);
                intersectionSize++;
            }
        }

        return (2.0 * intersectionSize) / (first.length + second.length - 2);
    },


    stringSimilarity: function (mainString, targetStrings) {
        const ratings = [];
        let bestMatchIndex = 0;

        for (let i = 0; i < targetStrings.length; i++) {
            const currentTargetString = targetStrings[i];
            const currentRating = this.compareTwoStrings(mainString, currentTargetString)
            ratings.push({ target: currentTargetString, rating: currentRating })
            if (currentRating > ratings[bestMatchIndex].rating) {
                bestMatchIndex = i
            }
        }

        const bestMatch = ratings[bestMatchIndex]

        return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
    },
};

export default Chatbot;

