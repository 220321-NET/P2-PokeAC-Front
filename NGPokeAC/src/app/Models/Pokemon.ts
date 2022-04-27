export class Pokemon
{
    id?: number;
    name?: string;
    hp?: number;
    attack?: number;
    special?: number;
    defense?: number;
    type?: string;
    rarity?: number;
    childID?: number;
    parentID?: number;
    combatAI?: string;
    specialAttack?: string;

    constructor (name: string, type: string) {
        this.name = name;
        this.type = type;
    }
}