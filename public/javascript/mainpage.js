const puma = document.getElementById("puma");
const nike = document.getElementById("nike");
const adidas = document.getElementById("adidas");

fetch("https://jsonplaceholder.typicode.com/photos?_limit=15").then((data)=>{
    // console.log(data);
    return data.json();
}).then((fetched_data)=>{
    // console.log(fetched_data[0].url);
    fetched_data.map(value=>{
        key = value.id;
        let img = document.createElement("img");
        img.src = value.url;
        puma.appendChild(img)
        // console.log(value.url)
    })
})




fetch("https://jsonplaceholder.typicode.com/photos?_limit=15").then((data)=>{
    return data.json();
}).then((fetched_data)=>{
    fetched_data.map(value=>{
        key = value.id;
        let img = document.createElement("img");
        img.src = value.url;
        nike.appendChild(img)
        // console.log(value.url)
    })
})



fetch("https://jsonplaceholder.typicode.com/photos?_limit=15").then((data)=>{
    // console.log(data);
    return data.json();
}).then((fetched_data)=>{
    // console.log(fetched_data[0].url);
    fetched_data.map(value=>{
        key = value.id;
        let img = document.createElement("img");
        img.src = value.url;
        adidas.appendChild(img)
        // console.log(value.url)
    })
})

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}