import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import vttToJson from 'vtt-to-json';

function App() {

  const [jsonTo, setJsonTo] = useState([])
  const [copied, setCopied] = useState(false)

  const handleVttInput = (evt) => {
    const vtt = evt.target.value
    try {
      vttToJson(vtt).then((result) => {
        const milkJson = parseVttJsonToMilkJson(result)
        setJsonTo(milkJson)
      });
    } catch (error) {
      console.error('error', error)
    }
  }

  const parseVttJsonToMilkJson = (vttJson) => {
    const milkJson = vttJson.map(wordEl => ({
      text: wordEl.part,
      start: wordEl.start,
      end: wordEl.end,
    }))

    return milkJson
  }

  console.log('jsonTo', jsonTo)

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100">
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Transform VTT to Milk JSON
              </h1>
              <p className="text-lg font-medium leading-tight text-gray-900">
                Paste VTT into left box
              </p>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div>
                <div className="space-y-8 divide-y divide-gray-200">
                  <div className="space-x-8 divide-gray-200 grid grid-cols-2">
                    <div className="col-span-1">

                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-6">
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                            VTT
                          </label>
                          <div className="mt-1">
                            <textarea onChange={handleVttInput} id="about" name="about" rows={3} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" defaultValue={""} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-6">
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                            JSON
                          </label>
                          <div className="mt-1">
                            <textarea rows={3} disabled className="bg-gray-50 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={JSON.stringify(jsonTo)} />
                          </div>
                          <div className="flex flex-row w-full justify-between">
                            <div className="mt-4">
                              {copied && <span className="mr-6 text-red-400">Copied</span>}
                              <CopyToClipboard text={JSON.stringify(jsonTo)}
                                onCopy={() => setCopied(true)}>
                                <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Copy to clipboard</span>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

    </div>
  );
}

export default App;
