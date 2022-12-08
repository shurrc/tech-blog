const signupFormHandler = async event => {
    event.preventDefault();

    const first_name = document.querySelector('#first-name-signup').value.trim();
    const last_name = document.querySelector('#last-name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    console.log(first_name, last_name, username, email, password);

    if (first_name && last_name && username && email && password) {
      try{
        let response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({first_name, last_name, username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          // response = await response.json();
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };

  document.querySelector('#signup-submit').addEventListener('click', signupFormHandler);