// Taken direct from tutorials
// Small edites were made. ie getbyText Title instead of Name. Editied using AI - https://chat.deepseek.com/share/rgozpjt7fdeamxss41
import { fireEvent, render } from '@testing-library/react-native'; 
import React from 'react'; 
import FormField from '../components/ui/form-field'; 
 
// Mock theme hook
jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: () => '#334155',
}));

describe('FormField', () => { 
  it('renders the label and fires onChangeText', () => { 
    const onChangeTextMock = jest.fn(); 
    const { getByText, getByLabelText } = render( 
      <FormField label="Title" value="" onChangeText={onChangeTextMock} /> 
    ); 
 
    expect(getByText('Title')).toBeTruthy(); 
    expect(getByLabelText('Title')).toBeTruthy(); 
  }); 
});
    // fireEvent is used to simulate user input in the TextInput
    fireEvent.changeText(getByLabelText('Title'), 'Learn Testing'); 
    expect(onChangeTextMock).toHaveBeenCalledWith('Learn Testing'); 
  }); 
});