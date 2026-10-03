# zaxh.org

Zach's personal hub — home, projects, and about, with a short status on the home page.

Built with React, Vite, and StyleX.

## Browser regression check

The scroll restoration check requires OpenCLI, Chrome, and the OpenCLI Browser
Bridge extension. Run `opencli doctor` to check the connection.

Run `pnpm build`, then start `pnpm preview --host 127.0.0.1 --port 4173 --strictPort`.
In another terminal, run `pnpm test:scroll`.

## Acknowledgments

This project's architecture and code structure is heavily inspired by [cyandev.app](https://github.com/unixzii/cyandev.app). Thanks to [@unixzii](https://github.com/unixzii) for the excellent reference implementation.

## License

MIT
