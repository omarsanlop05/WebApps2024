(async () => {
    const sh = await import('superheroes');
    const sv = await import('supervillains');

    var hero = sh.randomSuperhero();
    var villain = sv.randomSupervillain();

    console.log("Oh no! The villain " + villain + " is attacking the city!");
    console.log("No worries, the hero " + hero + " is here to save us!");
})();