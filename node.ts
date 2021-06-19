


let message : string = "aaa";
console.log(message);


class NodeObj{
    parents: NodeObj[]//list<NodeObj>;
    children: NodeObj[]//list<NodeObj>;
    title: string;
    path: string[]//list<String>;//Or array?

    constructor(parents: NodeObj[], title: string){

        this.parents = parents;
        this.title = title;
        this.children = [];

        
        if (parents.length != 0){
            this.path = new Array();

            for (var i = 0; i < parents.length; i++){
                this.path.push(parents[i].title);
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

    public toString(): string{
        return this.title + "- PATH:**" + this.path + "**, parent count: " + this.parents.length + ", children count: " + this.children.length;
    }
}

class NodeTree{

    root: NodeObj;//Tree representation
    allNodes: Map<string, NodeObj>;//Store access for all nodes

    constructor(newRoot: NodeObj){
        this.allNodes = new Map();


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


let tree: NodeTree = new NodeTree(new NodeObj([],"hello"));

tree.addChild(new NodeObj(new Array(tree.root), "second node"));

console.log(tree.root.toString());
console.log(tree.allNodes["second node"].toString());





