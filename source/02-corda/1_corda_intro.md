---
title: Corda
---

Corda is a permissioned "distributed ledger," not a blockchain. It is built for the financial system, specifically regulated financial institutions. More precisely, Corda's mission is to be an enterprise-grade shared platform for the sharing of financial events and execution logic. 

As of today, blockchain has almost become a synonym for cryptographically secure distributed ledger. So when you see the Corda team describe their platform as a blockchain, they are making it easier on the mind for the uninitiated.

## Permissioned

There is no place for anonymous actors in networks designed to connect regulated financial institutions. There is a precise admission process. Nodes are known to each other, and the system is designed to reject unauthorised nodes.

Corda networks include nodes with specific roles. Chief among these are Notaries. Notaries perform a special function in Corda's process of finalising transactions. A Corda network topology will generally include at least one node for each participating organisation as well as a Notary Service. The Notary (or Notaries) is conceived as a trustworthy neutral party and implemented as a fault-tolerant service.

In contrast to the uniform peer-to-peer construction of public blockchain networks, Corda networks call for designing a topology that is acceptable to all participants.

## Distributed Ledger

Corda is often informally referred to as a blockchain technology owing to the many similarities. Perhaps the main similarity is the end goal of a network of participants sharing a set of facts. Further similarities include the sharing of history about those facts and strict control over state transitions, a.k.a. “transactions.” Transactions update the facts. These properties are logically similar to blockchains.

In Corda however, there is no chain, and there are no blocks. Blockchain is a particular data structure that together with a powerful consensus system can provide convincing transaction finality, but Corda does something else entirely. "Distributed Ledger" turns attention to the logical result without misleading implications about the underlying process.

## For Regulated Financial Institutions

Public blockchains are not an option for many business functions of regulated financial institutions. First, consider that no one knows who owns the nodes in a public blockchain which leads to questionable accountability, which is unacceptable from a regulatory perspective. Also, the systems of rewards and penalties that secure public blockchains by making malfeasance prohibitively costly break down when the subject matter of transactions reaches the magnitude of transactions routinely processed by financial institutions. In case the preceding description is unclear, even a very costly attack is financially feasible if the expected return exceeds the cost. Therefore, an environment of anonymous and possibly hostile actors constrained by financial penalties is inappropriate for the settings Corda is designed to address.

Corda is also distinguished from other so-called "smart contract" platforms by its focus on familiar legal documents and codification of existing business logic. Blockchain-based platforms such as Ethereum (public), Quorum and the various Hyperledger projects apply what might be described as a software-first approach. These platforms are indeed novel environments for the creation of stateful application-level network protocols, but their designs bear little resemblance to legal contracts. Application designs often imply a significant departure from existing business processes.

Corda is different in that it focuses from the beginning on the legal language around how disputed agreements are resolved and the specific concerns of regulated financial institutions. While some blockchain maximalists proclaim that "Code is Law," in Corda, Law is Law, and Corda contracts are implementation.

## Execution Logic

Corda is not a virtual machine, nor is it designed to be "Turing-complete." Corda is purpose-built for recording, managing and synchronising facts shared by financial institutions. CorDapps which are the applications that can be built on Corda closely model business processes beginning with the existence of the legal contracts. In Corda, "Legal Prose" is a property of "contracts," and contracts implement legal agreements. Corda helps execute contracts by easily implementing business processes such as collecting approvals and signatures.

## What does Corda Solve?

As we saw earlier, each organisation maintains a ledger which records the firm's legal agreements and positions with counterparties. A great deal of activity between financial institutions revolves around reconciling divergent histories and facts. Inconsistencies are inevitable given the duplication of complex processes. This leads to further costly reconciliation and dispute-resolution which is itself error-prone and costly. Multiple views of the same transactions are a source of (potentially systemic) risk.

Duplication could be eliminated by a centralised database, but this implies a host of adjacent challenges. Technology costs would fall, but who would run it? Who would own it and what would happen if "the" system needed to be shut down temporarily for maintenance? What jurisdiction would host it and what would stop them from abusing control of the system? What if hackers gain access?

A distributed database is not a solution to this problem for the simple reason that all participants have to trust each other completely. A distributed database is a suitable architecture to tackle such problems as availability and performance within an organisation, but it is not a solution when the node operators don't trust each other fully.

<!-- !(Trust-Boundaries) -->

Distributed ledger alters the trust boundaries.

There is an element of pre-existing trust because the organisations in the network know each other and have decided to form a Corda network. The pre-existing trust does not imply that the organisations will share details of their internal processes, and Corda doesn’t require that they do. Nor does this element of trust imply that any organisation must blindly accept information from the network in deference to any consensus model.

Corda provides the network protocol for nodes to exchange messages about *possible* state transitions and each node verifies for itself if such a state transition is acceptable. Corda provides non-repudiation, meaning an inarguable history of the shared facts.


## Balancing Concerns

Corda attempts to balance several concerns; optimising for regulated financial institutions. These concerns include:

- Privacy and confidentiality
- Scalability
- Security
- Complexity
- others

## Point-to-Point

According to R3, "On the grounds of confidentiality, we reject the notion that data should be broadcast to all participants or cumbersome pre-defined groups." Corda communications are point-to-point on a "need-to-know" basis without broadcast. Need-to-know is quite different from Ethereum's public broadcast, Quorum's private transactions or Hyperledger Fabric's network "channels" approach. In a Corda network, if Alice transacts with Bob, then only Alice and Bob need to know about it, and possibly a regulator.

We can see immediately that Corda nodes do not share an all-encompassing view of the universe. Alice and Bob share a view of a specific transaction (and other details) that concerns them because they are parties to it, but each has information the other doesn't. Carol, who is not part of it receives no indication that the transaction even exists.

Physically, a Corda network is a fully connected graph, and all nodes can potentially send a message to any other node. A network map service informs nodes about the topology.

Corda networks are designed to scale. As we will see, the transaction finalisation process is designed to run as fast as the network and underlying hardware will permit. It isn't logically constrained by a pacing mechanism or the need to gather widespread agreement. If Alice and Bob agree that the transaction is finalised and various processes finalise it, then it's final.

## Message Queues

The system uses AMQP (Advanced Message Queuing Protocol) over TLS (Transport Layer Security) which provides resilient routing and queuing even in the case that nodes are restarted. AMQP is asynchronous, performs well under load, provides guarantees about message delivery and persistence and operates without assumptions about constant connectivity. When recipients are offline, messages queue up and retry until delivered.

## Legal Prose

For regulated financial institutions, reliance on courts of law in the case of conflict is a key requirement. Legal Prose is a property of contracts that define states. It is generally expected that a contract in Corda acquires form and effect from a traditional contract and the Legal Prose of that contract is usually a property of the software-based implementation. In Corda, a "contract" is a representation of a legally binding agreement.

This is quite different from virtual machine platforms on which "smart contracts" are less like legal agreements and more like persistent, stateful, application protocols described with software.

## UTXO

Corda uses an Unspent Transaction Output model, a.k.a. UTXO, to maintain immutability. Each transaction consumes zero or more states that previously existed and outputs zero or more new states. As a very simple example, consider a simple IOU. Alice will borrow $100 from Bob. The contract is the IOU agreement. It's purpose, in summary, is to describe the state of the loan. The description will include the Legal Prose, signatures of both Alice and Bob, terms, and so on. The transaction that produces this IOU contract will consume $100 of Bob's money (the old state). Suppose Bob begins with $1,000. In simplified form, the transaction will consume the old state (Bob no longer has exactly $1,000 dollars), and produce three new states: Bob now has $900, Alice has $100, and there is a loan contract in which Alice has agreed to repay $100.

Assuming this transaction is agreeable to both parties and finalised, then these new states exist, and the old states are consumed. We will cover where and how the states are stored later in this training. For now, the main point is that each state is unique and therefore has a unique hash. The transaction consumed states that can only be consumed once. This model makes it easy to analyze static snapshots of the data and reason about the contents of everything in flight. There are no accounts involved, and it is possible to apply transactions in parallel.

Mis-ordering of transactions is impossible since each transaction depends on the existence of states that came before and which can only be consumed one time. This structure neatly addresses the double-spending problem while putting minimal demands on the consensus process. All that is required is a reliable history of states that exist and a reliable means of extinguishing them.

## Transactions are Proposed State Changes

Unlike deterministic platforms that rely on each participant having a copy of the contract software and verifying correct execution of contract functions, Corda transactions are largely silent on the precise details of *how* the agreed outcome is achieved. Further, it is not important and generally not recommended that each party to a Corda contract should divulge their in-house proprietary logic and process. Transactions are proposed as hypothetical state changes but do not divulge exactly how each party approves or disapproves the transaction, or how they will comply with the terms of the contract.

In case this isn't clear, let's return to the simple IOU. This will help illustrate the processes and the meaning of important terms.

Consider a blank loan application. There is no borrower or amount yet, but the form of the agreement is essentially defined as boilerplate. When Alice completes the application, a certain amount of validation can unfold immediately. Alice’s state transition proposal will reference the IOU template (think `.class`) which will verify that Alice’s proposed IOU contract would be valid.  The proposed contract also includes the Legal Prose of the IOU agreement Alice wishes to instantiate.

In simplified terms, Alice may sign a proposal to amend the ledger such that $100 would appear in her account and then such an IOU contract as she proposes should exist. Her proposal describes the effect of the trade she wishes to commence with Bob.

This proposal is sent directly to Bob. Bob may reject it, and Bob is not required to reveal details of his decision-making process. If he wants to accept the proposal, he signs the transaction that results in a credit of $100 in Alice's account and a record of the IOU. Bob will, of course, attend to in-house accounting that will include finding a source of funds but this is not Alice's concern.

When all such conditions are met, and all required signatures are collected the transaction may become finalised. Finalisation will consume the old states and produce new states.

Alice will service the IOU through a series of transactions that will propose further amendments to various states. For example, installments that consume Alice's funds and also update the outstanding balance of the IOU. Bob will not accept such proposals without first confirming for himself that Alice's proposal complies with the terms of the contract. For example, if Alice proposed that the IOU should be extinguished for no money, there may be nothing in the contract that prevents her from making this proposal. Under normal circumstances, Bob would reject such a proposal. In Corda, the choice is up to Bob. State-change proposals are fundamentally different from platforms in which edge cases must be anticipated in advance and codified in immutable logic so that contracts can “decide” on the outcome.  

Corda’s process maps well to our understanding of established business processes. Alice proposes that she will agree to the terms of an IOU if Bob provides matching funds. As the IOU is repaid, Alice offers funds contingent on Bob agreeing to apply the funds to the IOU. In this context, a transaction can be understood as an evolution of one or more states that is agreeable and signed off by all interested parties.

## Re-use / Build

Corda uses existing banking industry standard bank-friendly libraries and avoids "re-inventing the wheel."

The JVM can be (and has been) modified to be deterministic. After whitelisting a small subset of classes/methods, the JVM attack surface is greatly reduced. Contract developers have access to the huge Java eco-system.

Persistence is provided by SQL databases which everybody knows, and this can ease integration with other in-house systems. Indeed, any SQL database can be used if it supports JDBC connectivity.

## Flexibility

As well as supporting different databases, Corda has no fixed consensus system. Notaries provide a reliable witness that is instrumental in ensuring that states can only be consumed once, thus preventing the race conditions that can lead to double spending. Notaries themselves can use different algorithms, and Notaries of different types can co-exist on a single Corda network. Therefore, on Corda networks, all transactions are not created equal.

<!--
## Use Cases

**suggestion to add Corda Use cases or in which industries Corda is applied:**
- finance
- healthcare
- supply chain management
- government
-->

<!--
## Corda in comparison with Ethereum and Hyperledger

**suggestion to add a paragraph about the differences. Found this articles:**
https://medium.com/@philippsandner/comparison-of-ethereum-hyperledger-fabric-and-corda-21c1bb9442f6
https://medium.com/@micobo/technical-difference-between-ethereum-hyperledger-fabric-and-r3-corda-5a58d0a6e347
https://blockchain-fabric.blogspot.com/2018/03/qualitative-comparison-of-hyperledger.html

**plus, I would add a comparison table. See the example in the image folder (this branch)**
-->

## Summary

Corda is similar to blockchain platforms in that it enables a group of participants to form a network with strong assurances about a shared set of facts. It does so without reliance on a blockchain. Corda balances various concerns such as transaction finality, confidentiality, availability and performance and provides flexibility at the level of the consensus mechanism applied to individual transactions.

In Corda, contracts are modeled closely after traditional legal contracts and usually include Legal Prose. Parties rely ultimately on courts of law rather than consensus mechanisms. The network is concerned with shared states, their histories, and coordination of the activities of the parties.  

Transactions are proposals to consume zero or more input states and produce zero or more output states, where states reference the contracts that give them meaning. Notaries witness such transactions and ensure that states are never consumed more than once. Information about shared states is shared only with parties to a given contract, observers such as regulators and Notaries on a need-to-know basis.
