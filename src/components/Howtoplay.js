import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Howtoplay({ visible, setVisible }) {


  const cancelButtonRef = useRef(null)
  return (

    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setVisible}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Game Instructions
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">
                        The game starts with the first player submitting the name of someone famous.
                        <div className="py-2">
                          The next player then must say the name of a famous person whose first name starts with the same letter as the previously stated famous person’s last name starts with.
                          <div className="my-4 pl-2 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
                            e.g.<br />
                            Player 1 : Michael Jackson
                            <br />
                            Player 2 : John Cena
                            <br />
                            Player 3 : Chris Hanson
                          </div>
                        </div>
                        <div className="pb-2">
                          If a a player does not submit a valid name in the alotted time, they will be docked a life and play will move on to the next player.
                        </div>
                        <div className="py-2">
                          If a player submits a name where the first and last name begins with the <strong>same letter</strong> (e.g. Ronald Reagan, Jack Johnson), the direction of play reverses.
                        </div>
                      </div>
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Game Settings
                      </Dialog.Title>
                      <div className="text-sm text-gray-500">
                        <ol>
                          <li className="py-1"> <strong>Max Players </strong>- The maximum amount of players allowed in the game.</li>
                          <li className="py-1"> <strong>Game Mode</strong> - Playing in Lives is an elimination mode where the last player standing wins. Continuous mode does not eliminate players upon wrong answers.</li>
                          <li className="py-1"> <strong>Max Lives</strong> - When playing in Lives mode, this will dictate how many lives each player has at the beginning of the game.</li>
                          <li className="py-1"> <strong>Time to Answer</strong> - The amount of time (in seconds) a user has to submit an answer.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setVisible(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

  )
}
