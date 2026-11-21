// @ts-check
import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const notesFile = fileURLToPath(
    new URL('./src/data/presenter-notes.json', import.meta.url),
);

const presenterNotesApi = {
    name: 'presenter-notes-api',
    configureServer(server) {
        server.middlewares.use('/__presenter-notes', async (request, response, next) => {
            if (request.method !== 'GET' && request.method !== 'PUT') {
                next();
                return;
            }

            const requestHost = request.headers.host?.split(':')[0];
            const isLocalHost = ['localhost', '127.0.0.1', '[::1]'].includes(requestHost ?? '');
            const requestOrigin = request.headers.origin;

            if (!isLocalHost || (requestOrigin && new URL(requestOrigin).host !== request.headers.host)) {
                response.statusCode = 403;
                response.end('Forbidden');
                return;
            }

            response.setHeader('Content-Type', 'application/json; charset=utf-8');
            response.setHeader('Cache-Control', 'no-store');

            if (request.method === 'GET') {
                response.end(await readFile(notesFile, 'utf8'));
                return;
            }

            let body = '';
            request.setEncoding('utf8');

            for await (const chunk of request) {
                body += chunk;
                if (Buffer.byteLength(body, 'utf8') > 65536) {
                    response.statusCode = 413;
                    response.end(JSON.stringify({ error: 'Notes payload is too large.' }));
                    return;
                }
            }

            try {
                const submittedNotes = JSON.parse(body);
                const store = JSON.parse(await readFile(notesFile, 'utf8'));
                const validIds = new Set(store.slides.map(({ id }) => id));
                const submittedIds = Object.keys(submittedNotes);
                const isValid =
                    submittedNotes &&
                    typeof submittedNotes === 'object' &&
                    !Array.isArray(submittedNotes) &&
                    submittedIds.length === validIds.size &&
                    submittedIds.every(
                        (id) => validIds.has(id) &&
                            typeof submittedNotes[id] === 'string' &&
                            submittedNotes[id].length <= 12000,
                    );

                if (!isValid) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Notes must match the existing slide IDs.' }));
                    return;
                }

                store.slides = store.slides.map((slide) => ({
                    ...slide,
                    notes: submittedNotes[slide.id],
                }));
                await writeFile(notesFile, `${JSON.stringify(store, null, 2)}\n`);
                response.end(JSON.stringify({ saved: true }));
            } catch {
                response.statusCode = 400;
                response.end(JSON.stringify({ error: 'Could not save presenter notes.' }));
            }
        });
    },
};

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [presenterNotesApi],
    },
});
