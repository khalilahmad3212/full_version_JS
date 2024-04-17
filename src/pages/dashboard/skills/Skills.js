import React, { useEffect, useState } from 'react';
import { Button, TextField, Chip, Stack } from '@mui/material';
import axios from 'axios';

const Skills = () => {
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);

  const API_URL = 'http://localhost:5001/skill'; // replace with your API URL

  // POST
  const postSkill = async (skill) => {
    try {
      const response = await axios.post(API_URL, { Name: skill });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // GET
  const getSkills = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkills = async () => {
    try {
      const skills = await getSkills();
      setSkills(skills);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSkill = async () => {
    if (skill) {
      try {
        await postSkill(skill);
        fetchSkills();
        setSkill(''); // Reset input field after submission
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await axios.delete(`${API_URL}/${skillId}`);
      setSkills((prevSkills) => prevSkills.filter((s) => s.Id !== skillId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Skill Name"
          variant="outlined"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
        />
        <Button onClick={handleAddSkill} variant="contained" sx={{ minWidth: 'fit-content' }}>
          Add Skill
        </Button>
      </Stack>
      <Stack direction="row" spacing={1} style={{ marginTop: '30px', flexWrap: 'wrap' }}>
        {skills.map((skill, index) => (
          <Chip key={skill.Id} label={skill.Name} onDelete={() => handleDeleteSkill(skill.Id)} />
        ))}
      </Stack>
    </div>
  );
};

export default Skills;
