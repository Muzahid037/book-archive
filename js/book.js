document.getElementById('search-btn').addEventListener('click', () => {
    //console.log("clicked");
    const searchKeyword = document.getElementById('search-input').value;
    document.getElementById('search-input').value = '';
    //console.log(searchKeyword);
    fetch(`https://openlibrary.org/search.json?q=${searchKeyword}`) 
        .then(res => res.json())
        .then(data => displaySearchResult(data));
});

const warningSection = document.getElementById('warning-section');
const countSection = document.getElementById('count-section');
const itemArea = document.getElementById('item-area');

const displaySearchResult = (data) => {
    const totalItemSize = data.numFound;
    //console.log(totalItemSize);
    //console.log(data.docs.length);

    if (totalItemSize === 0) {
        countSection.textContent='';
        warningSection.textContent='';
        itemArea.textContent='';
        
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="img/noResultFound.png" class="img-fluid" alt="...">
                <h3>Please input a valid keyword</h3>
        `;
        div.classList.add("d-flex");
        div.classList.add("justify-content-center");
        div.classList.add("align-items-center");
        div.classList.add("mt-5");
        warningSection.appendChild(div);
    }
    else {
        countSection.textContent='';
        warningSection.textContent='';
        itemArea.textContent='';

        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class="my-4"> <span class="text-primary fw-bold">${totalItemSize}</span> Results Found</h2>
        `;
        countSection.appendChild(div);

        let numberOfItemToBeDisplayed = Math.min(totalItemSize, 21);
        const books = data.docs.slice(0, numberOfItemToBeDisplayed);


        books.forEach(book => {
            //console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');

            let coverImg = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            let authorName=book.author_name;
            let bookName=book.title;
            let publishYear= book.first_publish_year;
            if (!book.cover_i) {
                coverImg="img/placeholder4.png";
            }
            if (!bookName) {
                bookName="Book name not Found";
            }
            if (!authorName) {
                authorName="Author name not Found";
            }
            if (!publishYear) {
                publishYear="Publish Year not Found";
            }



            div.innerHTML = `
            <div class="card h-100 p-2 border-2 border-secondary">
            
            <img src="${coverImg}" class="card-img-top img-fluid" alt="...">

              <div class="card-body">

              <table class="table table-bordered">
              <tbody>
                  <tr>
                      <th scope ="row">Book Name</th>
                      <td>${bookName}</td> 
                  </tr>
                  <tr>
                      <th scope ="row">Author Name</th>
                      <td>${authorName}</td> 
                  </tr> 
                  <tr>
                      <th scope ="row">First Publish Date</th> 
                      <td>${publishYear}</td> 
                  </tr>
              </tbody>
          </table>

              </div>

              <div class="card-footer">
              
              </div>
            </div>

            `;
            itemArea.appendChild(div);
        });


    }

}