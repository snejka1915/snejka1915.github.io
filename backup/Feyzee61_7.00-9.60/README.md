# PSFree WebKit Exploit & Lapse Kernel Exploit v2.3 for PS4

A PSFree & Lapse exploit for PS4 firmware 7.00 to 9.60
> ⚠️ This repository is for research and educational purposes only.

## Overview
This repository is a research-focused fork of [PSFree](https://github.com/kmeps4/PSFree) that aims to improve the reliability and success rate of existing public exploit code. The project’s main motivation is twofold:

1. **increase stability and success rate** through timing, error-handling and reliability improvements.

2. **reduce platform compatibility requirements** by converting the existing `.mjs` modular structure into plain `.js`. The result is less modular structure but is more portable codebase.

Through these changes, the original modular `.mjs` structure has been refactored into a single-file `.js` implementation designed to execute in a more sequential, `C-like` flow. This approach improves readability, simplifies debugging and ensures consistent execution timing across environments.

<p align="center">
  <img src="psfree_lapse_2.04.png" alt="PSFree" width="537" height="588"/>
</p>

---

## **Legal Notice & Disclaimer:**

- This repository does not host, or distribute any exploit hosting services
- Jailbreaking, circumventing security, or deploying exploits may be illegal in some jurisdictions.  
- It is your responsibility to ensure compliance with local laws.  
- The developer assumes **no responsibility** for any potential damage, data loss, or issues that may occur on your PlayStation console as a result of using this repository.  
- Use it at your own risk and only on your own devices.

## Major Changes

- **Removed all** `.mjs` **files** — converted the codebase to plain `.js` to improve cross-platform compatibility and simplify loading requirements.
- **Refactored for more sequential** `C-like` **execution** — code reorganized to follow a linear flow for easier reasoning, deterministic timing, and simpler debugging.
- **Rewrote** `Number.isInteger()` **implementation** — The original exploit implementation relied on `Number.isInteger()`, which I guess not fully supported in the PS4’s WebKit-based JavaScript environment (situated between `ES5` and `Partial ES6` compliance). To ensure consistent behavior across these runtimes, the function was rewritten using fundamental type and arithmetic checks. This guarantees proper integer validation even in restricted or legacy WebKit engines.
- **Rewrote** `hexdump()` **implementation** — adjusted string/byte handling to comply with the PS4’s WebKit-based JavaScript environment.
- **Added initialization checks for variable operations** — guard checks ensure variables are initialized before use to prevent undefined-state failures.
- **Reordered and cleaned global variable initializations** — made global setup deterministic and reduced race conditions at startup.
- **Added parentheses to some of the logic expressions** — explicit grouping was added to prevent operator-precedence ambiguities and reduce logic errors.
- **Removed debugging logs** — cleaned up and commented out debugging logs to reduce side effects and improve runtime consistency.
- **Embedded** `.elf/.bin` **assets as hex arrays inside JS** — binary resources converted to in-file hex arrays to avoid read/load errors in constrained environments.
- **Modernized shellcode implementation** — adapted structural conventions from the BD-JB source and introduced a utility function to convert kpatch hex strings into byte arrays.
- **Replaced** `XMLHttpRequest()` **with** `fetch()`**/file reads** — modernized file-loading code for better compatibility and promise-based control flow.
- **Removed all** `localStorage` **and** `sessionStorage` **usage** — Storage APIs were removed to avoid cross-origin restrictions, quota issues, and inconsistent behavior in sandboxed WebKit environments.
- **Implemented console firmware detection** — Added logic to automatically detect the running PS4 firmware version, enabling conditional execution paths and improving overall compatibility across different system revisions.
- **Merged various tweaks from Al-Azif’s source** — Incorporated selected stability, compatibility, and workflow improvements from Al-Azif’s implementation to enhance overall reliability and reduce edge-case failures.
- **Added multi-firmware support (7.00 -> 9.60) from Al-Azif’s source** — Full support implemented for firmware versions 7.00 through 9.60, including: Kernel patch + AIO fix .bin files
- **Reworked** `jitshm` **handling in the kpatch stage** — replaced the previous `write_fd` aliasing approach with direct `exec_fd` usage to simplify JIT shared memory management.
- **Minor adjustment to** `make_aliased_pktopts` **routine** — removed the repeated loop that previously attempted multiple alias creations. Failed retries could trigger kernel panic or immediate console shutdown. The updated routine now performs **a single attempt**; if it fails, the user is expected to restart from the system menu and retry safely. If you want to increase retry quantity, change the value `const pktopts_loopcnt = 1`.
- **Minor adjustment to kernel address leak scanning resolution** — reduced the offset increment step from `0x80` to `0x40` during the `leak_kernel_addrs` phase to increase detection accuracy and reduce the likelihood of missing valid structures.
- **Simlified payload loader function** — removed stub-based trampoline and switched to direct RWX payload execution.
- **GC handling improvements** — garbage collection handling within the PSFree stage has been refined to improve object scanning reliability. Memory layout adjustments were introduced to ensure that critical indices (including index 0) are properly scanned during GC traversal. This reduces the risk of unexpected object invalidation and increases exploit stability under memory pressure.
- **Stabilized failure handling via structured cleanup routine** — implemented a BD-JB-inspired `doCleanup()` function to properly release exploit resources before exit. Without this cleanup stage, failed attempts could leave the system in an unstable state, often triggering an immediate kernel panic and hard shutdown when attempting to restart. With proper resource unwinding, the console can now be safely restarted from the system menu, allowing clean retry attempts.
- **BinLoader function** — The BinLoader function is activated on the second run of the exploit. After checking if the host is already jailbroken, the host starts the BinLoader and listens on port 9020. Send your payload using a compatible payload injector. My repo `psx_payload_injector` can also be used.
- **Background image** — Background image support has been added. Rename your preferred image to **bg.jpg** and replace the existing file in the root directory. Make sure to use an image with an appropriate resolution.

## ToDo List

- Investigate Lapse Stage 3 to improve success rate

## Notes:

> Firmware 7.00–9.60 includes integrated PSFree kernel patch shellcodes and **AIO patch sets**.

> All payload binaries (`*.bin`, `*.elf`) were intentionally excluded. This repository does not include `payload.bin` file. Place your preferred Homebrew Enabler (HEN) payload in the root directory.

> Step-by-step jailbreak instructions were omitted for legal and ethical compliance.

> No modifications that alter the exploit logic in ways affecting device security outside test context.

## Local Self-Hosting

You can self-host the project using Python's built-in HTTP server.

Windows: `py -m http.server 8080`

Linux/macOS: `python3 -m http.server 8080`

On your PS4 browser, navigate to: `http://YOUR_PC_IP:8080/index.html`

## Contributing

Contributions are welcome! Feel free to open pull requests for bug fixes, UI improvements, or additional features.

## License
This project continues under the same open-source license as the original PSFree repository (**AGPL-3.0**).  
Please review the [LICENSE](LICENSE) before redistributing or modifying the code.

## Acknowledgments

Special thanks to:

* **ABC**, the designer of the PSFree and Lapse core software, whose foundational work made many of these improvements possible.
* [kmeps4](https://github.com/kmeps4) and [Al-Azif](https://github.com/Al-Azif) for their PSFree projects which inspired me a lot in this repo.
* **ps4dev team** for their continuous support and invaluable contributions to the PS4 research ecosystem. This project stands on the hard work of all the developers behind it — none of this would be possible without their efforts.
* everyone who tested the updates across various firmware versions and supported the project with their valuable feedback.

Extra thanks to **Dr.Yenyen** for thoroughly testing every supported firmware version and dedicating an incredible amount of time and effort to ensure stability and reliability.

## Contact

For questions or issues, please open a GitHub issue on this repository.
