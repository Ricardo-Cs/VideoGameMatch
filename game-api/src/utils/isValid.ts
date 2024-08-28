import { answerData, GameSearchResponse } from "../types/types";

export const isValid = (apiResponse: GameSearchResponse, answerData: answerData): boolean => {
    const response: boolean[] = [];
    answerData.categories.forEach((category) => {
        const apiResponseData = apiResponse.data.results;
        switch (category.type) {
            case "developers":
                const isDeveloperIncluded = apiResponseData.developers?.some(developer =>
                    developer.name === category.condition.value
                );
                response.push(isDeveloperIncluded ? true : false);
                break;

            case "releaseYear":
                const operator = category.condition.operator;
                const releaseYear = apiResponseData.original_release_date?.split("-")[0] as string;
                if (operator === "<") {
                    response.push(releaseYear < category.condition.value ? true : false)
                } else if (operator === ">")
                    response.push(releaseYear > category.condition.value ? true : false)
                break;

            case "genre":
                const isGenreIncluded = apiResponseData.genres?.some(genre =>
                    genre.name === category.condition.value
                );
                response.push(isGenreIncluded ? true : false);
                break;
            default:
                break;
        }
    });

    return response.every(condition => condition === true);
}