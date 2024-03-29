var __appState = {
    selected: 0,
    debugToggle: false,
    isLogoAnimating: false,
    fishes: [{
            name: "Koi fish",
            order: "Cypriniformes",
            model: 'koifish.glb',
            animation: {clip: 1, action: 'play'},
            link: 'https://en.wikipedia.org/wiki/Koi',
            scale: 0.05,
            rotation: "0 0 0",
            position: "0 -0.02 0",
            desc: "Koi fish are colored varieties of the common carp. Koi or more specifically nishikigoi are kept for decorative purposes in outdoor koi ponds or water gardens in Japan. Major colors of Koi fish are white, black, red, orange, yellow, blue, brown and cream."
        },
        {
            name: "Hammerhead Shark",
            order: "Carcharhiniformes",
            model: 'great_hammerhead_shark.glb',
            animation: {clip: 0, action: 'play'},
            link: 'https://en.wikipedia.org/wiki/Hammerhead_shark',
            scale: 0.15,
            rotation: "0 90 0",
            position: "0.05 0.07 0",
            desc: "The Great Hammerhead Shark is found in tropical and warm temperate waters worldwide, inhabiting coastal areas and the continental shelf. A solitary, strong-swimming apex predator, the great hammerhead feeds on a wide variety of prey ranging from crustaceans and cephalopods, to bony fish, to smaller sharks.",
        },
        {
            name: "Blue Whale",
            order: "Artiodactyla",
            model: 'blue_whale.glb',
            animation: {clip: 0, action: 'play'},
            link: 'https://en.wikipedia.org/wiki/Blue_whale',
            scale: 0.0005,
            rotation: "0 90 360",
            position: "0 -0.05 0",
            desc: "The Blue Whale (Balaenoptera musculus) is a marine mammal and a baleen whale. It is the largest animal known ever to have existed. The blue whale's long and slender body can be of various shades of greyish-blue dorsally and somewhat lighter underneath."
        }
    ],
    next: function() {
        if (this.selected < this.fishes.length - 1) {
            this.selected++
        }
    },
    prev: function() {
        if (this.selected > 0) {
            this.selected--
        }
    },
    render: function() {
        let selectedFish = this.fishes[this.selected];

        document.querySelector("#name").innerText = selectedFish.name;
        document.querySelector("#link").innerText = `Read more`;
        document.querySelector("#link").setAttribute("href", selectedFish.link);
        document.querySelector("#order").innerText = selectedFish.order;
        document.querySelector("#desc").innerText = selectedFish.desc;

        let childArray = Array.from(document.querySelector("#models").childNodes);

        // Hide all the fishes but the selected one
        childArray.forEach(child => {
            if (child.dataset.name == App.fishes[App.selected].name) {
                child.object3D.visible = true;

            } else {
                child.object3D.visible = false;
            }
        });
    },
    spinLogo: function() {

        if (this.isLogoAnimating) {
            clearInterval(this.spinAnimaton);
            this.isLogoAnimating = false;
            document.querySelector("#mrjs-logo").dataset.rotation = "0 0 0";
        } else {
            this.logoAngle = 0;
            this.spinAnimaton = setInterval(() => {
                this.logoAngle += 0.03;
                document.querySelector("#mrjs-logo").dataset.rotation = `${Math.cos(this.logoAngle) * 360} 0 0`;
            }, 16)
            this.isLogoAnimating = true;
        }
    }
}

// Magic reactivity
const handler = {
    set(target, property, value) {
        target[property] = value;
        App.render();
        return true;
    }
};

// Magic reactivity
const App = new Proxy(__appState, handler);

App.fishes.forEach(fish => {
    let model = document.createElement("mr-model");
    model.setAttribute("src", "./assets/" + fish.model);
    model.object3D.visible = false;
    model.dataset.name = fish.name;
    model.dataset.rotation = fish.rotation;
    model.dataset.position = fish.position;

    model.onLoad = () => {
        model.components.set('animation', fish.animation)
    }

    Object.assign(model.style, {
        scale: fish.scale
    })

    document.querySelector("#models").append(model);
});

document.addEventListener('DOMContentLoaded', function() {
    App.selected = 0;
});