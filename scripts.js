document.addEventListener('DOMContentLoaded', () => {
    // Recupera os posts do localStorage ou usa os posts padrão
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [
        {
            title: 'Introdução ao JavaScript',
            content: 'JavaScript é uma linguagem de programação versátil usada tanto no front-end quanto no back-end...'
        },
        {
            title: 'Trabalhando com APIs',
            content: 'APIs (Application Programming Interfaces) permitem que diferentes sistemas se comuniquem...'
        },
        {
            title: 'Desenvolvimento com React',
            content: 'React é uma biblioteca JavaScript popular para construção de interfaces de usuário...'
        }
    ];
    AddPosts(savedPosts);
});

const postsContainer = document.getElementById('posts');
const newPosts = document.getElementById('newPosts');

function AddPosts(posts) {
    posts.forEach(post => {
        createPostElement(post.title, post.content);
    });
}

function createPostElement(title, content) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postTitle = document.createElement('h2');
    postTitle.textContent = title;
    postElement.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.textContent = content;
    postElement.appendChild(postContent);

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btnEdit');
    btnEdit.innerText = 'Editar';
    btnEdit.addEventListener('click', () => editPost(postElement, postTitle, postContent, btnEdit, btnRemove));
    postElement.appendChild(btnEdit);

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btnRemove');
    btnRemove.innerText = 'Remover';
    btnRemove.addEventListener('click', () => removePost(postElement));
    postElement.appendChild(btnRemove);

    postsContainer.appendChild(postElement);
}

function editPost(postElement, postTitle, postContent, btnEdit, btnRemove) {
    const inputTitle = document.createElement('input');
    inputTitle.classList.add('inputEdit');
    inputTitle.type = 'text';
    inputTitle.value = postTitle.textContent.trim();
    if (inputTitle.value === '') {
        inputTitle.placeholder = '...';
    }
    inputTitle.addEventListener('click', function () {
        inputTitle.style.outline = '0';
    });
    postTitle.replaceWith(inputTitle);

    const inputContent = document.createElement('textarea');
    inputContent.classList.add('textEdit');
    inputContent.value = postContent.textContent.trim();
    if (inputContent.value === '') {
        inputContent.placeholder = '...';
    }
    inputContent.addEventListener('click', function () {
        inputContent.style.outline = '0';
    });
    postContent.replaceWith(inputContent);

    const btnSave = document.createElement('button');
    btnSave.classList.add('btnSave');
    btnSave.innerText = 'Salvar';
    btnSave.addEventListener('click', () => {
        const trimmedTitle = inputTitle.value.trim();
        const trimmedContent = inputContent.value.trim();

        if (trimmedTitle === '') {
            inputTitle.placeholder = '...';
            postTitle.textContent = '...';
        } else {
            postTitle.textContent = trimmedTitle;
        }

        if (trimmedContent === '') {
            inputContent.placeholder = '...';
            postContent.textContent = '...';
        } else {
            postContent.textContent = trimmedContent;
        }

        inputTitle.replaceWith(postTitle);
        inputContent.replaceWith(postContent);
        btnSave.remove();
        btnCancel.remove();
        btnEdit.style.display = 'inline-block';
        btnRemove.style.display = 'inline-block';
        postElement.style.padding = '1.5rem';

        // Atualiza os posts no localStorage
        savePostsToLocalStorage();
    });

    const btnCancel = document.createElement('button');
    btnCancel.classList.add('btnCancel');
    btnCancel.innerText = 'Cancelar';
    btnCancel.addEventListener('click', () => {
        inputTitle.replaceWith(postTitle);
        inputContent.replaceWith(postContent);
        btnSave.remove();
        btnCancel.remove();
        btnEdit.style.display = 'inline-block';
        btnRemove.style.display = 'inline-block';
        postElement.style.padding = '1.5rem';
    });

    btnEdit.style.display = 'none';
    btnRemove.style.display = 'none';

    postElement.style.padding = '7rem';
    postElement.appendChild(btnSave);
    postElement.appendChild(btnCancel);
}

function removePost(postElement) {
    postElement.remove();
    // Atualiza os posts no localStorage
    savePostsToLocalStorage();
}

function Cadastrar() {
    const newPost = document.createElement('div');
    newPost.classList.add('newPost');

    const inputTitle = document.createElement('input');
    inputTitle.classList.add('inputTitle');
    inputTitle.placeholder = "Digite seu Titulo";
    inputTitle.addEventListener('mouseout', function () {
        inputTitle.style.outline = '0';
    });

    const postDescription = document.createElement('input');
    postDescription.classList.add('postDescription');
    postDescription.placeholder = "Digite sua descrição";
    postDescription.addEventListener('mouseout', function () {
        postDescription.style.outline = '0';
    });

    const btnCadastro = document.createElement('button');
    btnCadastro.classList.add('btnCadastro');
    btnCadastro.innerText = 'Cadastrar';

    btnCadastro.addEventListener('click', () => {
        const valueTitle = inputTitle.value.trim();
        const valueDescription = postDescription.value.trim();

        if (valueTitle === '') {
            inputTitle.placeholder = '...';
        }
        if (valueDescription === '') {
            postDescription.placeholder = '...';
        }

        if (valueTitle && valueDescription) {
            createPostElement(valueTitle, valueDescription);
            newPosts.innerHTML = ''; // Limpa o conteúdo da div newPosts após adicionar o post
            newPosts.style.display = 'none'; // Esconde a div newPosts após adicionar o post

            // Salva os posts no localStorage
            savePostsToLocalStorage();
        }
    });

    newPost.appendChild(inputTitle);
    newPost.appendChild(postDescription);
    newPost.appendChild(btnCadastro);
    newPosts.innerHTML = ''; // Limpa qualquer formulário existente
    newPosts.appendChild(newPost);
    newPosts.style.display = 'flex'; // Garante que a div newPosts fique visível
}

function savePostsToLocalStorage() {
    const posts = [];
    document.querySelectorAll('.post').forEach(postElement => {
        const title = postElement.querySelector('h2').textContent;
        const content = postElement.querySelector('p').textContent;
        posts.push({ title, content });
    });
    localStorage.setItem('posts', JSON.stringify(posts));
}
