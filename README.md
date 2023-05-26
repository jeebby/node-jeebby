<p align="center">
  <img src="https://user-images.githubusercontent.com/6877485/210876437-1ee419a6-64ea-4be9-a715-8014bf4c9039.png" alt="Jeebby" />
</p>

# What is Jeebby?

The name Jeebby doesn't have a meaning. It's just a random name for this project.
But what is Jeebby? It's a tool that let novice people to run simple programs on their IOT devices.
The user buys an IOT device, buys sensors but wants to run a custom program. The user has to read manuals, learn tools and languages and then start writting/composing it's little program. This is good for IT minded people, but not for the common person.
Jeebby is the tool to deploy and manage the programs the users wants to connect with their IOT. In the background they deploy a Node-RED flow with their own parameters. If they want, they can open their program in Node-RED and extend, modify, debug, ... it.

# Node-RED nodes

The follow nodes are available to let your program use the Jeebby Storage and Status modules.

## Jeebby-status
![image](https://github.com/jeebby/node-jeebby/assets/6877485/c7edc8ca-6b7f-45af-9bbb-590afd3c3da4)

Give status feedback for the flow back to the Jeebby platform. This status is shown to the user for the flow on the Jeebby platform.
