class MRWater extends MREntity {

    constructor() {
        super()

        const params = {
            color: '#00ccff',
            scale: 0.25,
            flowX: 0.5,
            flowY: 0.5
        };

        const waterGeometry = new THREE.PlaneGeometry(0.9, 0.9);
        this.water = new Water(waterGeometry, {
            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2(params.flowX, params.flowY),
            normalMap0: new THREE.TextureLoader().load('./wat_norm1.jpg'),
            normalMap1: new THREE.TextureLoader().load('./wat_norm2.jpg'),
            textureWidth: 1024,
            textureHeight: 1024
        });

        this.water.material.clipping = true;
        this.object3D.add(this.water);

    }
}

customElements.get('mr-water') || customElements.define('mr-water', MRWater);