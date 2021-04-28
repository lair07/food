/*jshint esversion: 8 */

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // для формдата хедр был не нужен, поэтому он был закомментирован, а ля джсон он нужен
        },
        body: data
    });
    return await res.json(); // - это промис
};
// podtData - настраивает запрос, посылает запрос на сервер, получает какой-то ответ от сервера(что напримерр все прошло успешно) и после этого трансформирует этот объект в джсон

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }

    return await res.json(); // - это промис
};


export {postData};
export {getResource};