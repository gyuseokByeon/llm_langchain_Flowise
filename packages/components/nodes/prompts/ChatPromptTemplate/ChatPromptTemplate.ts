import { INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses } from '../../../src/utils'

class ChatPromptTemplate_Prompts implements INode {
    label: string
    name: string
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'Chat Prompt Template'
        this.name = 'chatPromptTemplate'
        this.type = 'ChatPromptTemplate'
        this.icon = 'prompt.svg'
        this.category = 'Prompts'
        this.description = 'Schema to represent a chat prompt'
        this.inputs = [
            {
                label: 'System Message',
                name: 'systemMessagePrompt',
                type: 'string',
                rows: 3,
                placeholder: `You are a helpful assistant that translates {input_language} to {output_language}.`
            },
            {
                label: 'Human Message',
                name: 'humanMessagePrompt',
                type: 'string',
                rows: 3,
                placeholder: `{text}`
            }
        ]
    }

    async getBaseClasses(): Promise<string[]> {
        const { ChatPromptTemplate } = await import('langchain/prompts')
        return getBaseClasses(ChatPromptTemplate)
    }

    async init(nodeData: INodeData): Promise<any> {
        const { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } = await import('langchain/prompts')
        const systemMessagePrompt = nodeData.inputs?.systemMessagePrompt as string
        const humanMessagePrompt = nodeData.inputs?.humanMessagePrompt as string

        const prompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(systemMessagePrompt),
            HumanMessagePromptTemplate.fromTemplate(humanMessagePrompt)
        ])
        return prompt
    }
}

module.exports = { nodeClass: ChatPromptTemplate_Prompts }
