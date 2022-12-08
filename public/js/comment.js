const newCommentFormHandler = async (loggedIn, idx, event) => {   //function for handling new comments
    event.stopPropagation(event);

    if (!loggedIn) return;

    const contents = document.querySelector(`#newcomment-text${idx}`).value.trim();  //takes text entered into text field
    const postId = document.querySelector(`.comment-id${idx}`).innerText   //pulls post-id hiddent in invisible element on each modal


    if (contents && postId) {
      try{
        let response = await fetch('/api/comments', {   //makes post request to comments api route
          method: 'POST',
          body: JSON.stringify({contents, postId}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
          response = await response.json();
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };

const submitBtn = document.querySelectorAll('.submit'); //adds event listener to submit button of all post modals. Bind method
    submitBtn.forEach(function(el, idx) {
    el.addEventListener('click', newCommentFormHandler.bind(this, $(el).attr('loggedIn'), idx)); 
});
