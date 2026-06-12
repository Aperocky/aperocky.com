# Client Development Guide for Service Engineers

I once came from building and running a service to building and packaging clients/daemons. This is a significant transition that came with differences that should be laid out up front.

**Service**: A web/internal service that customers reach via API.

**Client**: A packaged software vended to runtime environments that you do not necessarily control.

In AWS, it is common to find service expertise, in fact, most people work for a service in some way. It's a lot difficult to find people working on clients or deployed software - a famous example would be AWS CLI. But it's the exception, not the norm.

## What's Different?

1. You cannot rollback a client, once they are out on customer environment, they are out there. Any auto-update or auto-rollback mechanism are best effort, and do not necessarily work when you most need it, customer would also usually not want someone to update their environment without asking.
2. You can't just "access" or "fix" a client. The client is on customer environment and you only have limited interface of control, with potential that there are no such interface. Once a client is broke, it's potentially gone for good, requiring customer action to restore it.
3. You do not control nor predict the environment that the client would run on. If they are published as a package online, they could be installed anywhere and used for purposes that are not prescribed. SSM Agent has been installed on entertainment system on busses, industrial pump on factories. The customers expect them to work.

## What does this mean?

### Backwards Compatibility

Usually, clients are made to talk to a particular control server, that contract should never change with the exception of purely additional statements. All agents out there expect to continue to work, and hence the update to this contract must be carefully managed. Sometimes, the best solution is to be open ended - the gateway can accept flexible/extensible format, and then the backend would be able to process them differently with updates.

### Rollbacks (or lack thereof)

If something breaks, there are no rollbacks, but you can stop the bleeding: remove the distribution, remove the bad version from update mechanism. This do not solve the existing downloads, and rolling forward as soon as possible to allow the defective version to be removed from circulation, particularly if most people are on it through auto-update mechanism.

This also mean you don't deploy it like a service does. For a service even under blue green deployment, it usually completes a stack/url in 30 minutes or less. With agents that can ping home at longer durations, the deployment must follow a slow progression after testing. This maximally avoids situation like CrowdStrike where everything was shutdown immediately.

### Customer Environment aren't Yours

You cannot just expect logs to deep dive and fix as in running a service. I've done log dive - code change - emergency deployment in the space of 60 minutes for service level problems; This is not possible for Agents. Out of 100 problems, one may get reported, and then out of that 1 problem, you can wait weeks for logs. What you had on the service side are difficult to tell - a lot of time the connection disappeared, and there are no indication of whether customer decided to terminate the host or remove the software, both legitimate actions.

This means any problem can potentially take weeks to fix, through the same slow release mechanism.

### Resilience

A client therefore must be resilient, the host environment may decide to reboot, or throw certain unforseen environmental variables. To the maximal extent possible, the client should accomodate for this and work around the problems. This means having plan Bs and plan Cs, a flexible configuration that allows customer to configure the client to the specific environment, a fallback tree that allows for the client to survive in degraded condition. Both of these are what you *do not* want in a service - the service should operate exactly in a single path. Client do not get that benefit because it runs on environment that you do not control, and changes by the day.

Failing fast is a good practice on Service, not on agent, imagine your agent decided to fail fast on a remote environment, you say goodbye to that environment.

### Rapid Reproduction

Similar to test environment for services, test environment for agents are easy to have - this is very important in development, because the ability to build an updated agents in a few minutes with some code change, deploy it directly to interface with service to reproduce a problem is key to iteration and problem solving. From service perspective, a service update usually means testing with "conjectured" customer workflows. Here with an agent, the tests is fully covered - just deploy to a host/container and test with the existing service.

### Telemetry

While it is usually ill advised to send full logs, telemetry and dashboard are a godsend for problems arising from any agents and helps with debugging and ensuring an existing problem do not happen again.

## Summary

Some practice that would be considered bad/heresy for running a service but you should do it for client development:

1. Clients should be configurable - with rich configs for customers to select/use
2. Clients should have fallbacks and alternative paths and survive instead of fail fast.
3. Expect clients to not be able to rollback, and do not update contract in a breaking way, ever, if possible.
4. Test in "production". Use your test version of the client against the production endpoint for service. If possible, don't update both client and service at the same time. Feature must be backwards compatible on either side.
