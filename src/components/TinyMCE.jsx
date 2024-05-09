import { Editor } from '@tinymce/tinymce-react';

const TinyMCE = ({ value, onChange }) => {
  return (
    <div id="description" className="my-4">
      <Editor
        apiKey="rwvjr0jzpaf0k8tbonj5mzi8dqadcyf8uklhr5ondaept06r"
        init={{
          selector: 'textarea[name=description]',
          setup: function (editor) {
            editor.on('change', function () {
              tinymce.triggerSave();
            });
          },
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
        onChange={onChange}
        initialValue={value}
      />
    </div>
  );
};
export default TinyMCE;
