const access_key="rloHItvJ9a4Zz-ldsKywQlZ7q0sATRPhxD_aPIBmPXg";

const inputElm=document.querySelector(".form input");
const formBtn=document.querySelector(".form button");
const searchResults=document.querySelector(".search_results");

  gsap.from(".form input,.form h1,.form button",{
    y:-300,
    duration:0.9,
    scale:1.1 

  })



 let inputData="";
 let page=1;


async function searchImages()
{
  inputData=inputElm.value;
  let url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`
  const res=await fetch(url);
  const data=await res.json();
  console.log(data);
  const results=data.results;
  if(results.length===0)
  {
    searchResults.innerHTML="";
    document.querySelector(".error-box").style.display="block";
    document.querySelector(".error-box").style.backgroundColor="rgb(223, 215, 250)";

    document.querySelector(".error-box p").innerHTML="did not find any images ";
    gsap.from(".error-box",{

      bottom:-500,
      opacity:0,
      scale:0,
      

    }) 
    document.querySelector(".error-box button").addEventListener("click",()=>{
     
      document.querySelector(".error-box").style.display="none";
    })
    inputElm.value="";
    page=1;
    document.querySelector(".show_more").style.display="none";
    document.querySelector(".btns .top").style.display="none";
    return;
  }

  if(page===1)
  {
    document.querySelector(".btns .top").style.display="none";
    document.querySelector(".show_more").style.display="none";
    searchResults.innerHTML="";
  }

  gsap.from(".search_results",{
    scale:0,
    duration:0.7,
    top:-100,
    opacity:0
    
  })
  
  results.map(function(result)
  {
    const divElem=document.createElement("div");
    divElem.classList.add("search_result");
    const imgElem=document.createElement("img");
    imgElem.src=result.urls.small;
    imgElem.alt=result.alt_description;
    const aElem=document.createElement("a");
    aElem.href=result.links.html;
    aElem.target="_blank";
    aElem.textContent=result.alt_description;
    
    divElem.append(imgElem);
    divElem.append(aElem);
    searchResults.append(divElem);
    
  })

  page++;

  if(page>1)
  {
    document.querySelector(".show_more").style.display="block";
    document.querySelector(".btns .top").style.display="block";
  }
  else
  {
    document.querySelector(".show_more").style.display="none";
    document.querySelector(".btns .top").style.display="block";
  }
}

document.querySelector(".show_more").addEventListener("click",function(e)
{
  e.preventDefault();
  searchImages();
})

formBtn.addEventListener("click",function(e){
  searchResults.innerHTML="";  
  e.preventDefault();
  if(inputElm.value==="")
  {
    searchResults.innerHTML="";
    document.querySelector(".error-box").style.display="block";
    gsap.from(".error-box",{
      top:-300,
      opacity:0,
      scale:0,
      duration:0.8
      

    })
    document.querySelector(".error-box").style.backgroundColor="#8ECDDD";
    document.querySelector(".error-box").style.color="black";
    document.querySelector(".error-box p").innerHTML="You haven't given any input before searching";
    document.querySelector(".error-box button").innerHTML="❌";
    document.querySelector(".error-box button").style.backgroundColor="#001524";
    document.querySelector(".error-box button").addEventListener("click",()=>{
      
    document.querySelector(".error-box").style.display="none";
    document.querySelector(".error-box button").innerHTML="close";
    document.querySelector(".error-box button").style.backgroundColor="rgb(221, 55, 94)";

       
    

    })
  }
  else
  {
    searchImages();
  }
  
 
})

inputElm.addEventListener("keydown",function(e)
{
  if( e.key==='Enter' )
  {
   

    if(inputElm.value!=='')
    {
      searchResults.innerHTML="";
      searchImages();
    }
    else
    {
      
      searchResults.innerHTML="";
      document.querySelector(".error-box").style.display="block";
      gsap.from(".error-box",{
        y:-300,
        opacity:0,
        scale:0
      })
      document.querySelector(".error-box").style.backgroundColor="#8ECDDD";
      document.querySelector(".error-box").style.color="black";
      document.querySelector(".error-box p").innerHTML="You haven't given any input before searching";
     
      document.querySelector(".error-box button").innerHTML="❌";
      document.querySelector(".error-box button").style.backgroundColor="#001524";
      document.querySelector(".error-box button").addEventListener("click",()=>{
      document.querySelector(".error-box").style.display="none";
      document.querySelector(".error-box button").innerHTML="close";
      document.querySelector(".error-box button").style.backgroundColor="rgb(221, 55, 94)";
      document.querySelector(".show_more").style.display="none";
      document.querySelector(".btns .top").style.display="none";
      

    })
    }
    
  }
  
})