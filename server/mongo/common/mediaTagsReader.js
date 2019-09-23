import jsmediatags from 'jsmediatags';

const tagsToRead = ['title', 'artist', 'album', 'year', 'track', 'picture'];

export default function(fileName) {
  return new Promise((resolve, reject) => {
    new jsmediatags.Reader(fileName).setTagsToRead(tagsToRead).read({
      onSuccess(data) {
        resolve(data.tags);
      },
      onError(error) {
        reject(error);
      },
    });
  });
}
