---
title: Consensus
---

In a distributed network without authorities, we need a process to reach consensus about what is to be considered as the truth; this is referred to as distributed consensus. An identified problem in distributed computing, which is provably unsolvable but can nonetheless be mitigated, is how to reach consensus in a hierarchy-free, permission-less and failure-prone network.

This problem is commonly known as the Byzantine generals' problem. Mitigation strategies are known as Byzantine fault tolerance. In the traditional description of the problem, generals, whose armies are spread around a target city, need to reach consensus on a time to attack. To achieve this, they can only rely on unsecured communication channels, whereby, for instance, a lack of acknowledgement can either be caused by a failure to deliver a message, by a dead general or by a failure to deliver the acknowledgment.

The "problematic" decision a distributed ledger needs to make is to identify the agreed list, and correct order, of transactions. Indeed, as this technology is distributed, individual transactions are sent to the network from individual nodes. These nodes then pass, or fail to pass, transactions to other nodes. Because of physical latencies, not all nodes see the same transactions at the same time, so each node builds its own order of transactions. All nodes being equal citizens, there is, as such, no authoritative order of transactions; although a decision has to be made as to which node's version, or any version, of the truth shall be the authoritative truth.

One of the innovations introduced by Bitcoin in addition to the chain of blocks was to use proof-of-work to obtain consensus. Since then many other consensus algorithms for new blocks were proposed. One should note that there were consensus algorithms presented in the academic community before Bitcoin. Let us look at some of the most popular consensus algorithms.

### Proof-of-Work

<!-- ![](images/pow.png) -->

A user completes a task of arbitrary difficulty. This is generally implemented as a search for a random number which when combined with ordered transactions in a block yields a hash function result that matches a criteria such as minimum number of leading zeroes. Finding such a solution is taken as evidence of considerable effort (or proof that considerable work *must* have been invested) in the search.

<!-- Proof of Work https://www.youtube.com/watch?v=iCYj6BfxxJE -->
