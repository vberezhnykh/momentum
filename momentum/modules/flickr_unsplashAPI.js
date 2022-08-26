import {getTimeOfDay} from './greeting.js';
import {tags} from './background-slider.js';

let unsplashSetOfPhotos = [];
let newSetOfPhotos = [];

const timeOfDayUpperCase = getTimeOfDay();
const timeOfDay = timeOfDayUpperCase.toString().toLowerCase();

async function getLinkToImageUnsplash() {
    let url;
    if (tags === undefined) {
        url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}+nature&count=30&client_id=I3eBqT9_j8CoW8DuszAU_zsxllH3odilxkh7kNZ8ETE`;
    } else if (tags !== undefined) {
        url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&count=30&client_id=I3eBqT9_j8CoW8DuszAU_zsxllH3odilxkh7kNZ8ETE`
    }
    const res = await fetch(url);
    const data = await res.json();
    unsplashSetOfPhotos = [...data];
}

async function getLinkToImageFlickr() {
    let url;
    if (tags === undefined) {
        url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c6ab8ba7ed7bced1c3e2109248e2d6b&tags=nature%2C+${timeOfDay}&tag_mode=all&content_type=1&media=photos&extras=url_l&format=json&nojsoncallback=1`;
    } else if (tags !== undefined) {
        url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c6ab8ba7ed7bced1c3e2109248e2d6b&tags=${tags}&tag_mode=all&content_type=1&media=photos&extras=url_l&format=json&nojsoncallback=1`;
    }
    const res = await fetch(url);
    const data = await res.json();
    
    newSetOfPhotos = [];
    for (let i = 0; i < 30; i++) {
        let width = data.photos.photo[i].width_l;
        let height = data.photos.photo[i].height_l
        if (determinePhotoOrientation(width, height) === 'landscape') {
                newSetOfPhotos.push(data.photos.photo[i]);
            };
    }
}

function determinePhotoOrientation(width, height) {
    if (width > height) { 
        return 'landscape';
    } else if (width < height) {
        return 'portrait';
    } else {
        return 'square';
    }
}

export { unsplashSetOfPhotos, newSetOfPhotos, getLinkToImageUnsplash, getLinkToImageFlickr, determinePhotoOrientation }