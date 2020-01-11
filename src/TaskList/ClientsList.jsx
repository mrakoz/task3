import React from "react";
import { AddForm } from "./AddForm";
import { EditForm } from "./EditForm";
import { Filter, filterTasks } from "./filterTasks";
import { FilterSelect } from "./FilterSelect";

function addClient(
  clients, 
  clientToAdd 
) {
  return [...clients, clientToAdd];
}

function deleteClient(
  clients, 
  id

) {

  const clientIndex = clients.findIndex(client => client.id === id); 
  console.log(clients[clientIndex])
  return (
  [
    ...clients.slice(0, clientIndex),
    ...clients.slice(clientIndex + 1)
  ]
  );
}

function updateClient(
  clients, 
  id, 
  fieldToUpdate 

) {

  const clientIndex = clients.findIndex(client => client.id === id); 
  const clentToUpdate = clients[clientIndex];
  const clientCopy = { ...clentToUpdate, ...fieldToUpdate }; 

  return [
    ...clients.slice(0, clientIndex),
    clientCopy, 
    ...clients.slice(clientIndex + 1)
  ];
}

export class ClientsList extends React.Component {
  state = {
    clients: [
      {
        id: 1,
        name: "First test name",
        phone: "+34567895425",
      },
      {
        id: 2,
        name: "Second test name",
        phone: "+123123123",
      },
      {
        id: 3,
        name: "Third test name",
        phone: "+4564564564",
      }
    ],

    clientToEdit: null,


  };

  nextId = 4;

  render() {
    if (this.state.clientToEdit) {

      return (
        <EditForm
          userName={

            this.state.clients.find(client => client.id === this.state.clientToEdit)
              .name
          }

          userPhone={this.state.clients.find(client => client.id === this.state.clientToEdit)
            .phone
          }

          onSave={(name, phone) => {

            const copy = updateClient(this.state.clients, this.state.clientToEdit, {
              name, phone
            });

            this.setState({
              clients: copy, 
              clientToEdit: null
            });
          }}
          onCancel={() =>

            this.setState({
              clientToEdit: null
            })
          }
        />
      );
    }

    return (
      <>
        <AddForm
          onSave={(name, phone) => {

            const client = {
              id: this.nextId,
              name,
              phone
            };

            this.setState({
              clients: addClient(this.state.clients, client)
            });

            this.nextId++;
          }}
        />
        <h3>Список клиентов</h3>
        <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           
            {this.state.clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    onClick={() =>
                      this.setState({
                        clientToEdit: client.id
                      })
                    }
                  >
                    Правка
                  </button>
                  <button
                    onClick={() => {
                      this.setState({
                        clients: deleteClient(this.state.clients,client.id)
                      });
                    }}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </>
    );
  }
}
