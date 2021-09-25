function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included 
}


class NodeTranslationTemporaryObject
{
    parentNode?: NodeObject;
    identificationNumber: number = -1;
    title?: string;

    isObjectNodeReady()
    {
        if (this.identificationNumber === -1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    
    attemptConversionToNodeObject()
    {
        if (this.isObjectNodeReady())
        {
            return this.convertToNodeObject();
        }
        else
        {
            return null;
        }
    }

    convertToNodeObject()
    {
        return new NodeObject(this.identificationNumber, this.title, this.parentNode);
    }
}

class NodeObject
{
    parentNode?: NodeObject;
    children: NodeObject[];
    
    familyHierarchyPath: number[]; //Uses the ID numbers
    identificationNumber: number;
    title?: string;

    xPosition?: number;
    yPosition?: number;

    constructor(identificationNumber: number, title?: string, parentNode?: NodeObject)
    {
        this.identificationNumber = identificationNumber;
        if (title)
        {
            this.title = title;
        }

        if (parentNode)
        {
            this.parentNode = parentNode;
        }

        this.children = [];
        this.buildFamilyHierarchy();
    }

    getParentNode(){
        return this.parentNode;
    }

    getChildren(){
        return this.children;
    }

    getFamilyHierarchyPath(){
        return this.familyHierarchyPath;
    }

    getIdentificationNumber(){
        return this.identificationNumber;
    }

    getTitle(){
        return this.title;
    }

    getXPosition(){
        return this.xPosition;
    }

    getYPosition(){
        return this.yPosition;
    }

    setParentNode(parent: NodeObject)
    {
        this.parentNode = parent;
    }

    setChildren(children: NodeObject[])
    {
        this.children = children;
    }

    setFamilyHierarchyPath(path: number[])
    {
        this.familyHierarchyPath = path;
    }

    setIdentificationNumber(identificationNumber: number)
    {
        this.identificationNumber = identificationNumber;
    }

    setTitle(title: string)
    {
        this.title = title;
    }

    setPosition(xPosition: number, yPosition: number)
    {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    buildFamilyHierarchy()
    {
        let nodeToCheck: NodeObject = this.parentNode;
        let newPath: number [] = [];

        while (nodeToCheck != null)
        {
            newPath.push(nodeToCheck.getIdentificationNumber());
            nodeToCheck = nodeToCheck.getParentNode();
        }

        if (newPath.length > 0)
        {
            //Ensures that the first element is it's oldest ancestor
            if (newPath[0] !== this.parentNode.identificationNumber)
            {
                newPath.reverse();
            }
        }

        this.setFamilyHierarchyPath(newPath);
    }

    addChild(child: NodeObject)
    {
        this.children.push(child);
        child.setParentNode(this);
        child.buildFamilyHierarchy();
    }

    //! Untested
    removeChild(child: NodeObject)
    {
        this.children.splice(this.children.indexOf(child) , 1);
    }

    returnNodeLevel()
    {
        this.buildFamilyHierarchy();
        return this.familyHierarchyPath.length;
    }
}

class TreeRepresentationOfGraph
{
    rootNode: NodeObject;
    allNodes: Map<number, NodeObject> = new Map<number,NodeObject>();
    deepestLevel: number = 0;

    constructor(rootNode?: NodeObject)
    {

        if (rootNode)
        {
            this.rootNode = rootNode;
            this.allNodes.set(rootNode.getIdentificationNumber(), rootNode);
            this.deepestLevel = 1;
        }

        console.log("Creating tree");
    }

    setRootNode(rootNode: NodeObject)
    {
        this.rootNode = rootNode;
    }

    addChildToNode(parentNode: NodeObject, childNode: NodeObject)
    {
        parentNode.addChild(childNode);
        this.allNodes.set(childNode.getIdentificationNumber(), childNode);
        
        if (parentNode.returnNodeLevel() + 1 > this.deepestLevel)
        {
            this.deepestLevel = parentNode.returnNodeLevel() + 1;
        }

    }

    addChildToNodeParentID(parentNode: number, childNode: NodeObject)
    {
        this.allNodes.get(parentNode).addChild(childNode);
        this.allNodes.set(childNode.getIdentificationNumber(), childNode);

        if (this.allNodes.get(parentNode).returnNodeLevel() + 1 > this.deepestLevel)
        {
            this.deepestLevel = this.allNodes.get(parentNode).returnNodeLevel() + 1;
        }
    }

    buildTreeCoordinates(nodeWidth: number, nodeHeight: number,marginHorizontal: number, marginVertical: number)
    {
        let levels: NodeObject[][] = [];

        console.log("deepestLevel: " + this.deepestLevel);

        for(let i = 0; i <= this.deepestLevel; i++)
        {
            levels.push([]);
        }

        this.allNodes.forEach((node, idNumber) => {

            levels[node.returnNodeLevel()].push(node);            
        });

        let levelWithHighestLength = 0;

        for (let i = 0; i < levels.length; i++)
        {
            if (levels[levelWithHighestLength].length < levels[i].length)
            {
                levelWithHighestLength = i;
            }


            console.log("Level: " + i + " with: " + levels[i].length + " nodes");
        }
        
        console.log("Level with the highest length: " + levelWithHighestLength);
        console.log("With: " + levels[levelWithHighestLength].length);


        for (let i = 0; i < levels.length; i++)
        {
            for (let j = 0; j < levels[i].length; j++)
            {
                this.allNodes.get(levels[i][j].getIdentificationNumber()).setPosition(((marginHorizontal + nodeWidth) * j), (i * (nodeHeight + marginVertical)) );
            }
        }

    }
}


let rootNode = new NodeObject(0, "Root");
let treeTest = new TreeRepresentationOfGraph(rootNode);

let numberOfNodesToCreate = 100;

for (let i = 1; i < numberOfNodesToCreate; i++)
{
    treeTest.addChildToNodeParentID(getRandomIntInclusive(0, i - 1), new NodeObject(i, "Node " + i));
}


treeTest.buildTreeCoordinates(10,10,10,10);
console.log(treeTest.rootNode);