%% Web Access using Data Import and Export API
uri = 'http://localhost:9200/twitter/_mapping/user?pretty';
body = struct(...
    'properties', struct(...
        'email', struct(...
            'type', 'keyword'...
        )...
    )...
);
options = weboptions(...
    'RequestMethod', 'put',...
    'MediaType', 'application/json'...
);
response = webwrite(uri, body, options);

%% HTTP Interface
import matlab.net.*
import matlab.net.http.*
import matlab.net.http.io.*

header = HeaderField('Content-Type', 'application/json');
uri = URI('http://localhost:9200/twitter/_mapping/user?pretty');
body = JSONProvider(struct(...
    'properties', struct(...
        'email', struct(...
            'type', 'keyword'...
        )...
    )...
));
response = RequestMessage('put', header, body).send(uri.EncodedURI);
