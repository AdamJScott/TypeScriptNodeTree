class NodeObj{
    parents: NodeObj[]//list<NodeObj>;
    children: NodeObj[]//list<NodeObj>;
    title: string;
    path: string[]//list<String>;//Or array?

    constructor(parents: NodeObj[], title: string){

        this.title = title;
        this.children = [];
        this.parents = [];

        for (var i = 0; i < parents.length; i++){
            this.parents.push(parents[i]);
        }

        
        if (parents.length != 0){
            this.path = new Array();

            for (var i = 0; i < parents[0].path.length; i++){
                this.path.push(parents[0].path[i]);
            }

            this.path.push(title);
        }
        else{
            this.path = new Array(title);
        }

    }

    public getHeight(){
        return this.path.length;
    }

    //TODO implement
    public addChild(child: NodeObj): void{
        this.children.push(child);
    }

    //TODO implement
    public deleteChild(child: NodeObj): void{

    }

    //TODO implement
    public addParent(parent: NodeObj): void{

    }

    //TODO implement
    public removeParent(parent: NodeObj): void{

    }

    public traverseChildren(parent: NodeObj): string{

        var tabHeight = "\t";

        for (var i = 0; i < parent.children.length; i++){
            console.log(tabHeight.repeat(parent.getHeight())+ "v---> "  + this.traverseChildren(parent.children[i]));
        }

        return parent.title;
    } 


    public toString(): string{
        return this.title + "- PATH:**" + this.path + "**, parent count: " + this.parents.length + ", children count: " + this.children.length;
    }
}

class NodeTree{

    root: NodeObj;//Tree representation
    allNodes: Map<string, NodeObj>;//Store access for all nodes

    constructor(newRoot: NodeObj){
        this.allNodes = new Map<string, NodeObj>();


        this.root = newRoot;
        this.allNodes[newRoot.title] = newRoot;
    }


    GetNodeByTitle(title: string): NodeObj{
        return this.allNodes.get(title);
    }

    addChild(newNode: NodeObj ): void{
        let parentNode: NodeObj = newNode.parents[0];

        parentNode.addChild(newNode);
        this.allNodes[newNode.title] = newNode;
    }

    deleteChild(nodeToDelete: NodeObj): void{

    }

    addParent(parentNode: NodeObj, newChild: NodeObj){

    }

    deleteParent(nodeToDelete: NodeObj): void{

    }

    treeToString(): string{
        console.log("Printing tree for: " + tree.root.title);
        return this.root.traverseChildren(this.root);
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


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included 
  }


let tree: NodeTree = new NodeTree(new NodeObj([],"hello"));



for (var i = 0; i < 4; i++){
    tree.addChild(new NodeObj(new Array(tree.root), i + " node out of 3(4)"));
}

for (var i = 10; i < 20; i++){
    let allNodes = [...Object.values(tree.allNodes)];
    console.log(i + " started........");
    if (i == 19){
        console.log(allNodes);
    }

    tree.addChild(new NodeObj(new Array(allNodes[getRandomIntInclusive(0, allNodes.length - 1)]), i + " random assigned node"));
}

//console.log(tree.root.toString());

//console.log(tree.allNodes);

console.log(tree.treeToString());
