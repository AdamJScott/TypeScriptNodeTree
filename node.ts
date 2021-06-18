


let message : string = "aaa";
console.log(message);


class Node{
    parents: List<Node>;
    children: List<Node>;
    title: string;
    path: string;//Or array?

    constructor(){

    }



    /*
        TODO
        Add child
        delete child
        add new parent
        remove parent
        generate path

    */
}

class NodeTree{

    root: Node;

    constructor(newRoot: Node){
        this.root = newRoot;
    }

    /*
        Need to:
            Add method
            Delete method
            Search method
            path follow method
            Breadth search bottom up post order?

    */

}