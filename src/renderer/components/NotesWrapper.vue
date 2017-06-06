<template lang="pug">
  .NotesWrapper
    .NotesWrapper__left-sided
      h2 Electron-vue-notes
      ul.Notes
        li.Note(v-for="note in notes"
                @click="selectCurrentNote(note)"
                :class="{active: isActive(note)}")
          span {{note.content}}
      .NotesActions
        span.NotesActions__new(@click="newNote()")
          icon(name="plus")
          span Create
    .NotesWrapper__right-sided(v-if="selectedNote")
      .CurrentNote
        textarea(v-model="selectedNote.content") {{selectedNote.content}}
        .CurrentNote__delete(@click="deleteNote(selectedNote)")
          icon(name="trash")
          span Delete
    .AppInfo


</template>

<script>

  import 'vue-awesome/icons';
  import Icon from 'vue-awesome/components/Icon';

  export default {
    name: 'notes-wrapper',

    components: {
      Icon
    },

    data() {
      return {
        notes: [
          {id: 1, content: 'blah blah blah'},
          {id: 2, content: 'to to tot to'},
          {id: 3, content: 'lorem ipsum'},
          {id: 4, content: 'bibibi'}
        ],

        selectedNote: null
      }
    },

    mounted() {
      this.selectCurrentNote(this.notes[0]);
    },

    methods: {
      isActive (note) {
          return this.selectedNote === note
      },

      isSelectedNote (note) {
          return this.selectCurrentNote === note;
      },

      cleanEmptyNotes () {
          this.notes = this.notes.filter(note => {
              return note.content != '';
          })
      },

      selectCurrentNote (note) {
          this.selectedNote = note;
          this.cleanEmptyNotes();
      },

      deleteNote (currentNote) {
          this.notes = this.notes.filter(note => {
              return currentNote.id != note.id;
          });
          this.selectedNote = this.notes[this.notes.length - 1];
      },

      newNote () {
          const newNote = { id: (Math.random() * (1000 - 10) + 10), content: 'My new note' };

          this.notes.push(newNote);
          this.selectedNote = this.notes[this.notes.length - 1];
      }
    }
  }
</script>


<style lang="scss">

  .NotesWrapper {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: flex;
    width: 100%;
    height: 100vh;
    font-size: 18px;

    &__left-sided, &__right-sided {
      height: 100%;
      overflow-y: scroll;
    }

    &__left-sided {
        width: 25%;
        background: #6C7A89;

        h2 { font-size: 18px; color: #EEEEEE; margin: 0; padding: 10px 20px 0 20px; }

        .NotesActions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
          padding: 20px;

          &__new {
            display: flex;
            align-items: center;
            background: #3FC380;
            padding: 5px;
            text-transform: uppercase;
            color: white;
            cursor: pointer;
            font-size: 14px;
            border-radius: 5px;
            font-weight: bold;

            span { margin-left: 5px; }
          }
        }

        .Notes {
          margin: 0;
          padding: 20px;
          list-style: none;

          .Note {
            height: 20px;
            display: flex;
            width: 100%;
            overflow: hidden;
            flex-wrap: nowrap;
            padding: 5px 0;
            color: #22313F;
            font-weight: bold;
            border-top: 2px solid #EEEEEE;

            span { width: 100%; padding: 0 5px; overflow: hidden; text-overflow:ellipsis; }

            &:last-child { border-bottom: 2px solid #EEEEEE; }

            &:hover { cursor: pointer; }

          }

          .active { background: #ECF0F1; }

        }
    }

    &__right-sided {
        position: relative;
        width: 75%;
        background: #ECF0F1;

        textarea {
            padding: 20px;
            height: 100%;
            width: 100%;
            font-size: 18px;
            box-sizing: border-box;
            background: transparent;
            border: none;

          &:focus {
              outline: none !important;
          }

        }

        .CurrentNote {
            &__delete {
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 10px;
                right: 10px;
                padding: 5px;
                font-size: 14px;
                border: 1px solid #F22613;
                background: #F22613;
                text-transform: uppercase;
                color: white;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;

                span { margin-left: 5px; }
            }
        }
    }
  }


</style>
