


let message : string = "aaa";
console.log(message);


class NodeObj{
    parents: []//list<NodeObj>;
    children: []//list<NodeObj>;
    title: string;
    path: []//list<String>;//Or array?

    constructor(){

    }

    public getHeight(){
        return this.path.length;
    }

    //TODO implement
    public addChild(child: NodeObj): void{

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

    //TODO implement
    toString(node: NodeObj): string{

        let vars : string = "";



        return vars;
    }

}

class NodeTree{

    root: NodeObj;//Tree representation
    allNodes: Map<string, NodeObj>;//Store access for all nodes

    constructor(newRoot: NodeObj){
        this.root = newRoot;
    }


    GetNodeByTitle(title: string): NodeObj{
        return this.allNodes.get(title);
    }

    addChild(path: [], newNode: NodeObj ): void{
        let parentNode: NodeObj = this.allNodes.get(path[path.length - 1]);

        parentNode.addChild(newNode);

    }

    deleteChild(nodeToDelete: NodeObj): void{

    }

    addParent(parentNode: NodeObj, newChild: NodeObj){

    }

    deleteParent(nodeToDelete: NodeObj): void{

    }

    treeToString(): string{

        return "";
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