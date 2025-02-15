const closebtn = document.getElementById('close');
const projectImg = document.getElementById('projectImg');
const projectText = document.getElementById('projectText');
const block1 = document.getElementById('block1');
const block2 = document.getElementById('block2');
const block3 = document.getElementById('block3');
const block4 = document.getElementById('block4');
const block5 = document.getElementById('block5');
const block6 = document.getElementById('block6');
const blockdetails = document.getElementById('proiectDetail');

block1.addEventListener('click', () => {
    let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum omnis perspiciatis facere quasi
    voluptatem sequi pariatur, ipsa iure velit voluptatum eius asperiores nisi voluptate quis quidem fugit.
    Dolor numquam autem reprehenderit esse soluta maxime omnis doloribus tempora, tenetur impedit sed!`;
    let img = '/assets/slider/slide1.jpg'
    insertDetails(img, text);
    toggleBlockDetails();
});

block2.addEventListener('click', () => {
    let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum omnis perspiciatis facere quasi
    voluptatem sequi pariatur, ipsa iure velit voluptatum eius asperiores nisi voluptate quis quidem fugit.
    Dolor numquam autem reprehenderit esse soluta maxime omnis doloribus tempora, tenetur impedit sed!`;
    let img = '/assets/slider/slide2.jpg'
    insertDetails(img, text);
    toggleBlockDetails();
});

block3.addEventListener('click', () => {
    let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum omnis perspiciatis facere quasi
    voluptatem sequi pariatur, ipsa iure velit voluptatum eius asperiores nisi voluptate quis quidem fugit.
    Dolor numquam autem reprehenderit esse soluta maxime omnis doloribus tempora, tenetur impedit sed!`;
    let img = '/assets/slider/slide3.jpg'
    insertDetails(img, text);
    toggleBlockDetails();
});

block4.addEventListener('click', () => {
    let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum omnis perspiciatis facere quasi
    voluptatem sequi pariatur, ipsa iure velit voluptatum eius asperiores nisi voluptate quis quidem fugit.
    Dolor numquam autem reprehenderit esse soluta maxime omnis doloribus tempora, tenetur impedit sed!`;
    let img = '/assets/slider/slide4.jpg'
    insertDetails(img, text);
    toggleBlockDetails();
});

block5.addEventListener('click', () => {
    let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum omnis perspiciatis facere quasi
    voluptatem sequi pariatur, ipsa iure velit voluptatum eius asperiores nisi voluptate quis quidem fugit.
    Dolor numquam autem reprehenderit esse soluta maxime omnis doloribus tempora, tenetur impedit sed!`;
    let img = '/assets/slider/slide5.jpg'
    insertDetails(img, text);
    toggleBlockDetails();
});

block6.addEventListener('click', () => {
    let text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum omnis perspiciatis facere quasi
    voluptatem sequi pariatur, ipsa iure velit voluptatum eius asperiores nisi voluptate quis quidem fugit.
    Dolor numquam autem reprehenderit esse soluta maxime omnis doloribus tempora, tenetur impedit sed!`;
    let img = '/assets/slider/slide6.jpg'
    insertDetails(img, text);
    toggleBlockDetails();
});

closebtn.addEventListener('click', () => toggleBlockDetails());

const toggleBlockDetails = () =>{
    if(blockdetails.style.display == 'none') blockdetails.style.display = 'flex';
    else blockdetails.style.display = 'none';
}

const insertDetails = (imgUrl, text) =>{
    projectImg.src = imgUrl;
    projectText.innerText = text;
}