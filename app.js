const tweetForm = document.getElementById('tweet-form');
const tweetInput = document.getElementById('tweet-text');
const tweetsList = document.getElementById('tweets-list');

const savedTweets = JSON.parse(localStorage.getItem('tweets')) || [];

for (const tweet of savedTweets) {
    addTweet(tweet);
}

function addTweet(tweet) {
    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet');
    tweetElement.innerHTML = `
            <div>
                <button class="edit-button">Editar</button>
                <button class="delete-button">Eliminar</button>
            </div>
            <div>
                <p>${tweet.text}</p>
            </div>
            <div>
                <small>${tweet.date}</small>
                <button class="like-button" data-likes="${tweet.likes || 0}">
                Me gusta (${tweet.likes || 0})
                </button>
                <button class="follow-button">${tweet.following ? 'Dejar de seguir' : 'Seguir'}</button>
            </div>
        `;
    // tweetsList.insertBefore(tweetElement, tweetsList.firstChild);
    tweetsList.appendChild(tweetElement)
  
    const likeButton = tweetElement.querySelector('.like-button');
    likeButton.addEventListener('click', function () {
      tweet.likes = (tweet.likes || 0) + 1;
      likeButton.dataset.likes = tweet.likes;
      likeButton.textContent = `Me gusta (${tweet.likes})`;
      const index = savedTweets.findIndex((t) => t.text === tweet.text);
      if (index !== -1) {
        savedTweets[index] = tweet;
        localStorage.setItem('tweets', JSON.stringify(savedTweets));
      }
    });
  
    const followButton = tweetElement.querySelector('.follow-button');
    followButton.addEventListener('click', function () {
      tweet.following = !tweet.following;
      followButton.textContent = tweet.following ? 'Dejar de seguir' : 'Seguir';
      const index = savedTweets.findIndex((t) => t.text === tweet.text);
      if (index !== -1) {
        savedTweets[index] = tweet;
        localStorage.setItem('tweets', JSON.stringify(savedTweets));
      }
    });
  
    const editButton = tweetElement.querySelector('.edit-button');
    const tweetText = tweetElement.querySelector('p');
    editButton.addEventListener('click', function () {
      const editText = prompt('Editar comentario:', tweetText.textContent);
      if (editText !== null) {
        tweet.text = editText;
        tweetText.textContent = editText;
        const index = savedTweets.findIndex((t) => t.text === tweet.text);
        if (index !== -1) {
          savedTweets[index] = tweet;
          localStorage.setItem('tweets', JSON.stringify(savedTweets));
        }
      }
    });
  
    const deleteButton = tweetElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                tweetElement.remove();
                const index = savedTweets.findIndex((t) => t.text === tweet.text);
                if (index !== -1) {
                    savedTweets.splice(index, 1);
                    localStorage.setItem('tweets', JSON.stringify(savedTweets));
                }
        }
    });
  }

tweetForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const tweetText = tweetInput.value.trim();
  
    if (tweetText === '') {
      return;
    }
  
    const tweet = {
      text: tweetText,
      date: new Date().toLocaleString(),
      likes: 0,
      following: false,
    };

    addTweet(tweet);

    savedTweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(savedTweets));

    tweetInput.value = '';
});
  
