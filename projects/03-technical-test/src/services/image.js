export const getNewImage = ({fact}) => {

    const firstWord = fact.split(' ', 3).join(' ')

    return fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
    .then(res => res.json())
    .then(data => {
        const { _id } = data;
        const url = `${_id}/says/${firstWord}?fontSize=40&fontColor=white`
        return url;
    })

};