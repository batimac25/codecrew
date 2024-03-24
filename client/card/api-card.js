const createCard = async (credentials, card) => {
    try {
        let response = await fetch(`/api/cards`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(card)
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
};

const listCards = async (userId, credentials, signal) => {
    try {
        let response = await fetch(`/api/cards/by/${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            signal: signal,
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
};

const updateCard = async (cardId, credentials, card, userId) => {
    try {
        let response = await fetch(`/api/cards/${cardId}/userId/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(card)
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
};

const removeCard = async (userId, cardId, credentials) => {
    try {
        let response = await fetch(`/api/userId/${userId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
};

export { createCard, listCards, updateCard, removeCard };
