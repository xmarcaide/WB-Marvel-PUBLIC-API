class comic {

    constructor(title, superHeroName = []) {
        this.title = title;
        this.superHeroName = superHeroName;
    }

    getTitle() {
        return this.title;
    }

    getSuperHeroNames() {
        return this.superHeroName;
    }
}