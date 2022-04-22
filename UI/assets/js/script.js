async function displayImage() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/gastly');
    const data = await response.json();
    document.write("<img src=" + data.sprites.other["official-artwork"].front_default + ">");
}

displayImage();

